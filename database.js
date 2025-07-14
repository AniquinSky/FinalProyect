
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./personajes.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS personajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        fruta_del_diablo TEXT,
        recompensa TEXT,
        imagen_url TEXT,
        video_url TEXT
    )`);
});

module.exports = db;
