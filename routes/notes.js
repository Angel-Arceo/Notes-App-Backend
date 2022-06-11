const express = require('express');
const verifyToken = require('../middleware/verifyToken.js')
const { newNote, editNote, deleteNote } = require('../controllers/notes.js')


const router = express.Router();

router.post('/newNote/', verifyToken, newNote);
router.put('/editNote/:id', verifyToken, editNote);
router.delete('/deleteNote/:id', verifyToken, deleteNote);

module.exports = router;