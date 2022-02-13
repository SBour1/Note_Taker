const express = require('express');
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json')
let custArr

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    req.body.id = Math.floor((1 + Math.random()) * 0x10000)
    notes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    custArr = [];
    for (let i = 0; i < notes.length; i++) {
        if (req.params.id != notes[i].id) {
            custArr.push(notes[i])
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(custArr));
    notes = custArr;
    res.json(notes);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);