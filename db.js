const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

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
  }
};

module.exports = { getSuggestions };
