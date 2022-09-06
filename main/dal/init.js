const path = require("path");
const { Database } = require("sqlite3");

const dbPath = path.join(__dirname, "../database/db.sqlite3");

const db = new Database(dbPath.replace("app.asar", "app.asar.unpacked"));

db.exec(
  `
  CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL
  );
  CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playlist TEXT NOT NULL,
    title TEXT NOT NULL,
    path TEXT NOT NULL,
    duration REAL NOT NULL,
    FOREIGN KEY (playlist) REFERENCES playlists(title)
  );
`,
  (e) => {
    if (e) throw e;
  }
);

module.exports = db;
