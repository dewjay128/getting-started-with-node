const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const getSuggestions = (request, response) => {
  const searchTerm = request.query.search;

  pool.query(
    `SELECT * FROM artists ORDER BY SIMILARITY(name,'${searchTerm}') DESC LIMIT 5;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = { getSuggestions };
