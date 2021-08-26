const express = require('express')
const morgan = require('morgan')
const validateMiddleware = require('./helpers/validateMiddleware')

const app = express()
const usersRoute = require('./routes/users')

// server config
app.set('PORT', process.env.PORT || 3005)
const port = app.get('PORT')

// config middlewares
app.use(express.json())
app.use(morgan('tiny'))

// validation

usersRoute.param('id', validateMiddleware)

// routes
app.use(usersRoute)

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


module.exports = { app, server }