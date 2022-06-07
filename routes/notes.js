const express = require('express');
const { newNote, editNote, deleteNote } = require('../controllers/notes.js')


const router = express.Router();

router.post('/newNote/', newNote);
router.put('/editNote/', editNote);
router.delete('/deleteNote/', deleteNote);

module.exports = router;