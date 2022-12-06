const express = require ('express');

// Requires the notes.js file from routes
const notes = require('./notes');

const app = express();

// Says to use notes.js when on the notes route(notes.html)
app.use ('/notes', notes);

module.exports = app;