const router = require('express').Router(); // Creates a new router object 

const notesRouter = require('./notes');

router.use('/notes', notesRouter); // Use the notes.js file when routing /notes requests

module.exports = router;