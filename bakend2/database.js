const Database = require("better-sqlite3");

const db = new Database("esp32.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        token TEXT,
        dateTime TEXT
    )
`);

module.exports = db;
