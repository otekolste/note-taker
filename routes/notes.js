const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

notes.get('/', (req,res) => {
    fs.readFile('./db/db.json','utf8', (err, data) => {
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
            noteID: uuidv4(),
        };
    console.log(newNote);
    console.log(JSON.stringify(newNote));
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
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


module.exports = notes;