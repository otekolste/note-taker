// DEPENDENCIES
const express = require('express');
const path = require('path');

const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express(); // Create new instance of express object

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api); 

// GET HTML route for /notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );
// GET HTML route for index
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
  
  


  