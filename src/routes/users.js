const { Router } = require('express')
const UserService = require('../services/User')
const validateMiddleware = require('../helpers/validateMiddleware') 

const users = []

const router = Router()

router.get('/users', async (_, response) => {
    const users = await UserService.getAll()
    return response.json({ users })
})


router.get('/users/:id', validateMiddleware, async (request, response) => {
    const { id } = request.params
    
    const user = await UserService.getById(id)
    
    if (user)
        return response.json(user)

    response
        .status(404)
        .json({ message: 'User not found'})

})


router.post('/users', (request, response) => {
    const { name, email } = request.body
    
    if (name && email) {
        const id = users.length + 1
        users.push({ id, name, email })

        return response
            .status(201)
            .json({ message: 'User created succesfully' })
    }
    
    response
        .status(400)
        .json({ message: 'Failed to create. Required name and email'})
})


module.exports = router