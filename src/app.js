const express = require('express')
const app = express()
const usersRoute = require('./routes/users')

app.set('PORT', process.env.PORT || 3005)
const port = app.get('PORT')

app.use(express.json())

app.use(usersRoute)

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


module.exports = { app, server }