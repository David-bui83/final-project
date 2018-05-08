const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
    res.render('index', {title: 'IS445 Final Project'})
})

module.exports = router