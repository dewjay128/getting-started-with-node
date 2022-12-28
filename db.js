const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const KEYWORD_SEARCH_EVENT = 1;

const getIp = (req) => req?.connection?.remoteAddress || req?.ip || "";

const saveEvent = (tag, value, sid) => {
  try {
    pool.query(
      "INSERT INTO events (tag, value, sid) VALUES ($1, $2, $3) RETURNING *;",
      [tag, value, sid],
      (error, results) => {
        if (error) {
          console.log("Couldn't save event");
        }
      }
    );
  } catch (e) {}
};

const getSuggestions = (request, response) => {
  const searchTerm = request.query.search;
  if (searchTerm) {
    pool.query(
      "SELECT suggestion FROM suggestions ORDER BY SIMILARITY(suggestion,$1) DESC LIMIT 5;",
      [searchTerm],
      (error, results) => {
        if (error) {
          throw error;
        }
        return response.status(200).json(results.rows);
      }
    );
    saveEvent(KEYWORD_SEARCH_EVENT, searchTerm, getIp(request));
  }
};

const createUser = (request, response) => {
  const { email, message } = request.body;

  pool.query(
    "INSERT INTO users (email, message) VALUES ($1, $2) RETURNING *",
    [email, message],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = { getSuggestions, createUser, getUsers };
