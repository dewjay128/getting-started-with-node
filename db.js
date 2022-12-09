const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

function getSuggestions(searchTerm) {
  return pool.query(
    `SELECT * FROM artists ORDER BY SIMILARITY(name,'${searchTerm}') DESC LIMIT 5;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      return results.rows;
    }
  );
}

module.exports = { getSuggestions };
