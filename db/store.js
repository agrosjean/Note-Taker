const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
// const id = uuid.v4();

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
    // getNotes
    // 2. Append new note to the end of list
    // 3. Write the list of notes back to the db.json
};

module.exports = {
    getNotes
};