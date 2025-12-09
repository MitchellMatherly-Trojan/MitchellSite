const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb.sqlite');

db.run(`
CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    color TEXT NOT NULL,
    owner TEXT NOT NULL
);
`);

module.exports = db;
