const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((req, res, next) =>{
    next(createError(404))
})

app.use((err, req, res, next) => {

    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

const mongoose = require('mongoose')
const user = process.env.MDB_USER
const passwd = process.env.MDB_PASSWORD

mongoose.connect(`mongodb://${user}:${passwd}@ds217360.mlab.com:17360/is445-project`)
.then(() => console.log('connection successful'))
.catch(err => console.log(err))

module.exports = app