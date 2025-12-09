const express = require('express');
const db = require('./carDB');

const app = express();
app.use(express.json());


app.post('/cars', (req, res) => {
    const { make, model, year, owner, color } = req.body;
    if (!make || !model || !year || !color || !owner) return res.status(400).json({ error: "both f and l name are required"});

    db.run(
        'INSERT INTO cars (make, model, year, color, owner) VALUES (?, ?, ?, ?, ?)',
           [make, model, year, color, owner],
           function(err) {
               if (err) {
                   return res.status(500).json({ error: "please include all fields"});
               }

               res.json({
                   id: this.lastID,
                   make,
                   model,
                   year,
                   color,
                   owner

               });
           }
    );
});

app.get('/cars', (req, res) => {
    db.all('SELECT * FROM cars', (err, rows) => {
        if (err) {
            return res.status(500).json({error: "can't get!" });
        }
        res.json(rows);
    });
});

app.get('/cars/:req', (req, res) => {
    const searchQueary = req.params.req;

    db.all('SELECT * FROM cars WHERE id = ? OR make LIKE ? OR model LIKE ? OR year LIKE ? OR color LIKE ? OR owner LIKE ?', [searchQueary], (err, rows) => {
        if (err) {
            return res.status(404).json({error: 'No Results' });
        }

        res.json(rows);
    });
});


app.put('/cars/:searchQuery', (req, res) => {
    const userID = req.params.searchQuery;
    const {make, model, year, color, owner } = req.body;

    if (!make || !model || !year || !owner || !color) {
        return res.status(400).json({ error:"please include all fields"});
    }

    const query = 'UPDATE cars SET make = ?, model = ?, year = ?, color = ?, owner = ? WHERE id = ?';
    const params = [make, model, year, color, owner, userID];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json ({
            id: userID,
            make,
            model,
            year,
            color,
            owner
        });
    });
});

app.delete('/cars/:searchQuery', (req, res) => {
    const userID = req.params.searchQuery;

    const query = 'DELETE FROM cars WHERE id = ?'
    const param = [userID];

    db.run(query, param, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json({message: `User deleted successfully`});
    });
});


app.listen(3000, () => {
    console.log('running on 3000');
});
