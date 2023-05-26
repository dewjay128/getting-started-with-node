const Pool = require("pg").Pool;
const axios = require("axios");
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const KEYWORD_SEARCH_EVENT = 1;
const WRITER_SEARCH_EVENT = 2;

const getMetadata = (request) => ({
  ip:
    request?.headers?.["true-client-ip"] ||
    request?.headers?.["x-forwarded-for"] ||
    "",
  country: request?.headers?.["cf-ipcountry"] || "",
  cf_ray: request?.headers?.["cf-ray"] || "",
  device: request?.headers?.["sec-ch-ua-platform"] || "",
});

const saveEvent = (tag, value, ip, country, cf_ray, device) => {
  try {
    pool.query(
      "INSERT INTO events (tag, value, ip, country, cf_ray, device) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [tag, value, ip, country, cf_ray, device],
      (error, results) => {
        if (error) {
          console.log("Couldn't save event", error);
        }
      }
    );
  } catch (e) {}
};

const getSuggestionsFromDB = async (searchTerm) => {
  const response = await pool.query(
    "SELECT suggestion FROM suggestions ORDER BY SIMILARITY(suggestion,$1) DESC LIMIT 3;",
    [searchTerm]
  );
  return response.rows;
};

const getSuggestions = async (request, response) => {
  const searchTerm = request.query.search;
  if (!searchTerm) return response.status(404);

  const metadata = getMetadata(request);

  const dbSuggestions = await getSuggestionsFromDB(searchTerm);

  saveEvent(
    KEYWORD_SEARCH_EVENT,
    searchTerm,
    metadata.ip,
    metadata.country,
    metadata.cf_ray,
    metadata.device
  );

  return response.status(200).json(dbSuggestions);
};

module.exports = { getSuggestions };
