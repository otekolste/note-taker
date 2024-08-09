const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req,res) => {
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

module.exports = notes;