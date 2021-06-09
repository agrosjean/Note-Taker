const path = require('path');
const router = require('express').Router();

// HTTP 
// [METHOD] /URL
// METHOD => GET, POST, PUT, DELETE, PATCH, OPTIONS

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// All other routes will respond with the index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;