// DEPENDENCIES
const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const dbPath = './db/db.json'

// GET API route for notes
notes.get('/', (req,res) => {
    fs.readFile(dbPath,'utf8', (err, data) => { // Read database JSON file
        if(err) {console.error(err)} // Checks for error, logs to console
        else {
            try {
                res.json(JSON.parse(data)); // Tries to parse file
            }
            catch(e) { // Catches error (error is thrown when JSON file is empty). If error occurs, return empty string
                res.json('');
            }
        }

    })
})
// POST API route for notes
notes.post('/', (req,res) => {
    const { title, text } = req.body; // Destructurize info from request

    if(req.body) { // If the request body exists, create a new note, passing in the parameters and generating a unique ID
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    fs.readFile(dbPath, 'utf8', (err,data) => { // Read database JSON file
        if(err) {console.error(err)} // Checks for error, logs to console
        else {
            let notesArray; // Declare note array
            try{            
             notesArray = JSON.parse(data); // Tries to parse JSON data - this is in place in case the JSON db is empty, in which case it will throw an error
            }
            catch(e) { // If an error is thrown, initializes as empty array
                notesArray = [];
            }
            notesArray.push(newNote); // Pushes the newly-created note to the array
            fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => err ? console.error(err) : res.json(newNote)); // Re-writes updated database to JSON

        }
    });
    }
    else {
        res.error('An error occurred in attempting to add the tip.'); // If no request body, return error
    }

})
// DELETE API route for notes
notes.delete('/:id', (req,res) => { 
    fs.readFile(dbPath, 'utf8', (err,data) => { // Read database JSON file 
        if(err) {console.error(err)} // Checks for error, logs to console
        else {
            let notesArray = JSON.parse(data); // Parses the JSON database file and stores contents in array
            let noteIndex = notesArray.findIndex((element) => element.id == req.params.id); // Finds the index of the note to be deleted, based on its ID
            if(noteIndex != -1) {notesArray.splice(noteIndex, 1);} // If a valid index has been found, removes the note at that index
            fs.writeFile(dbPath, JSON.stringify(notesArray), (err) => err ? console.error(err) : res.json('Successfully deleted note.')); // Re-writes updated database to JSON
        }


    })

})

module.exports = notes;