const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

// look up uuid (util.promisify)

const getNotes = () => {
    const readFileAsync = util.promisify(fs.readFile);
    return readFileAsync('db/db.json', { encoding: 'utf8' })
        .then(dbString => {
            return JSON.parse(dbString);
        })
        .catch(err => {
            console.log('Error while getting notes: ', err);
        })
};

const createNote = (newNote) => {
    // 1. Get list of notes
    return getNotes()
        .then(notesList => {
            newNote.id = uuid.v4();
            // 2. Append new note to the end of list
            notesList.push(newNote);
            // 3. Write the list of notes back to the db.json
            const writeFileAsync = util.promisify(fs.writeFile);
            return writeFileAsync('db/db.json', JSON.stringify(notesList, null, 2))
                .then(() => {
                    return 'OK';
                })
        })
};

const deleteNote = (noteId) => {
    // 1. Get list of notes
    return getNotes()
        .then(notesList => {

            // 2. Check if not with this ide, exists in our db
            const exists = notesList.map(el => el.id).includes(noteId);
            if (!exists) {
                return 'Not Found'
            }
            const notesListClean = notesList.filter(el => el.id !== noteId);

            // 3. Write the list of notes back to the db.json
            const writeFileAsync = util.promisify(fs.writeFile);
            return writeFileAsync('db/db.json', JSON.stringify(notesListClean, null, 2))
                .then(() => {
                    return 'OK';
                })
        })
}

module.exports = {
    getNotes,
    createNote,
    deleteNote
};