const router = require('express').Router();
const store = require('../db/store');

// create a route that respondes with all notes coming from the database

// [GET] /api/notes
router.get('/notes', (request, response) => {
    store.getNotes()
        .then((notes) => {
            response.json(notes)
        })
        .catch((err) => res.status(500).json(err));
});

// [POST] /api/notes (Create new note)
router.post('/notes', (request, response) => {
    const newNote = request.body;
    store.createNote(newNote)
        .then(() => {
            response.json({ message: 'OK' })
        })
        .catch((err) => res.status(500).json(err));
});

// [DELET] /api/notes/:id (Delete existing note)

module.exports = router;