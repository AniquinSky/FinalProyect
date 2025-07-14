
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    db.all('SELECT * FROM personajes', [], (err, rows) => {
        if (err) throw err;
        res.render('index', { personajes: rows });
    });
});

app.get('/add', (req, res) => {
    res.render('form', { personaje: {}, action: '/add' });
});

app.post('/add', (req, res) => {
    const { nombre, fruta_del_diablo, recompensa, imagen_url, video_url } = req.body;
    db.run(`INSERT INTO personajes (nombre, fruta_del_diablo, recompensa, imagen_url, video_url)
            VALUES (?, ?, ?, ?, ?)`,
        [nombre, fruta_del_diablo, recompensa, imagen_url, video_url],
        () => res.redirect('/')
    );
});

app.get('/edit/:id', (req, res) => {
    db.get('SELECT * FROM personajes WHERE id = ?', [req.params.id], (err, row) => {
        if (err) throw err;
        res.render('form', { personaje: row, action: `/edit/${req.params.id}` });
    });
});

app.post('/edit/:id', (req, res) => {
    const { nombre, fruta_del_diablo, recompensa, imagen_url, video_url } = req.body;
    db.run(`UPDATE personajes SET nombre = ?, fruta_del_diablo = ?, recompensa = ?, imagen_url = ?, video_url = ?
            WHERE id = ?`,
        [nombre, fruta_del_diablo, recompensa, imagen_url, video_url, req.params.id],
        () => res.redirect('/')
    );
});

app.post('/delete/:id', (req, res) => {
    db.run('DELETE FROM personajes WHERE id = ?', [req.params.id], () => res.redirect('/'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
