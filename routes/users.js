const express = require('express')
const router = express.Router()

const user = require('../controllers/user')

router.get('/', user.list)

router.post('/user', user.create)

router.get('/user/:id?', user.edit)

router.put('/user/:id?', user.update)

router.delete('/user/:id', user.delete)

module.exports = router