const express = require('express')
const router = express.Router()

const { getUser, getUsers, deleteUser } = require('../controllers/users.js');

router.get('/getUser/:id', getUser)
router.get('/getUsers/', getUsers)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;