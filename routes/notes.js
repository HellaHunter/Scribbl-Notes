const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fs');

// The route to GET all notes in the db.json
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route to get a specific note based off it's uuid
notes.get('/:id', (req,res) => {
    const note_Id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === note_Id);
            return result.length > 0
                ? res.json(result)
                : res.json("Sorry, no notes with that ID available");
        });
});

// Deletes a note based of its uuid and then re-writes the db.json file minus the deleted note
notes.delete('/:id', (req,res) => {
    const note_Id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Returns an array of the notes minus the chosen note
            const result = json.filter((note) => note.id !== note_Id);

            // Re-writes the array of notes to db.json without the note you deleted
            writeToFile('./db/db.json', result);

            res.json(`Note ${note_Id} has been removed and deleted`);
        });
})

notes.post('/', (req,res) => {
    const { title, text } =  req.body;

    // If there is text in the title and text value spots, then create a new note json with a uuid
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`New note added succesfully`)
    } else {
        // Error message for a non valid save
        res.errored("Sorry, that note didn't work")
    }
})

module.exports = notes;