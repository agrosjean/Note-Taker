const router = require('express').Router();
const store = require('../db/store');

// create a route that respondes with all notes coming from the database

router.route('/notes')
    // [GET] /api/notes
    .get((request, response) => {
        store.getNotes()
            .then((notes) => {
                response.json(notes)
            })
            .catch((err) => res.status(500).json(err));
    })
    // [POST] /api/notes (Create new note)
    .post((request, response) => {
        const newNote = request.body;
        store.createNote(newNote)
            .then((msg) => {
                response.json({ message: msg })
            })
            .catch((err) => res.status(500).json(err));
    })

// [DELETE] /api/notes/:id (Delete existing note)
router.route('/notes/:noteId')
    .delete((request, response) => {
        const id = request.params.noteId;
        store.deleteNote(id)
            .then((msg) => {
                response.json({ message: msg });
            })
            .catch((err) => res.status(500).json(err));
    });

module.exports = router;