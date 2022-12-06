const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require ('./routes/index.js');

// Sets port
const PORT = process.env.PORT || 3001;

const app = express();

// Uses middleware to track what POSTS, GETS, and DELETES are happening
app.use(clog);

// Standard Express set-up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

app.use(express.static('public'));

// Route for homepage
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route for the Notes page
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// Wildcard route to redirect back to homepage
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);