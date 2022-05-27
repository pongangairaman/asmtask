const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "postcute<3",
    host: "localhost",
    port: "5432",
    database: "asmtask1"
});

module.exports = pool;