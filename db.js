const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const getSuggestions = (request, response) => {
  const searchTerm = request.query.search;
  if (searchTerm) {
    pool.query(
      `SELECT * FROM suggestions ORDER BY SIMILARITY(suggestion,'${searchTerm}') DESC LIMIT 5;`,
      (error, results) => {
        if (error) {
          throw error;
        }
        return response.status(200).json(results.rows);
      }
    );
  }
};

module.exports = { getSuggestions };
