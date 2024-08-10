const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const dbPath = './db/db.json'


notes.get('/', (req,res) => {
    fs.readFile(dbPath,'utf8', (err, data) => {
        if(err) {console.error(err)}
        else {
            try {
                res.json(JSON.parse(data));
            }
            catch(e) {
                res.json('');
            }
        }

    })
})

notes.post('/', (req,res) => {
    console.log('hi');
    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    console.log(newNote);
    console.log(JSON.stringify(newNote));
    fs.readFile(dbPath, 'utf8', (err,data) => {
        if(err) {console.error(err)}
        else {
            let notesArray;
            try{            
             notesArray = JSON.parse(data);
            }
            catch(e) {
                notesArray = [];
            }
            notesArray.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => err ? console.error(err) : res.json(newNote));

        }

    });

    }
    else {
        res.error('An error occurred in attempting to add the tip.');
    }

})

notes.delete('/:id', (req,res) => {
    fs.readFile(dbPath, 'utf8', (err,data) => {
        if(err) {console.error(err)}
        else {
            let notesArray = JSON.parse(data);
            let noteIndex = notesArray.findIndex((element) => element.id == req.params.id);
            console.log(`id: ${req.params.id}`);
            if(noteIndex != -1) {notesArray.splice(noteIndex, 1);}
            fs.writeFile(dbPath, JSON.stringify(notesArray), (err) => err ? console.error(err) : res.json('Successfully deleted note.'));
        }


    })

})

module.exports = notes;