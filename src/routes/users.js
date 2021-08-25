const { Router } = require('express')

const users = []

const router = Router()

router.get('/users', (req, res) => {
    return res.json({ users })
})


router.get('/users/:id', (req, res) => {
    const { id } = req.params
    
    const user = users.find(user => user.id === id)
    
    if (user)
        return res.json(user)
    
    res
        .status(404)
        .json({ message: 'U'})

})


router.post('/users', (req, res) => {
    const { name, email } = req.body
    
    if (name && email) {
        // create
        const id = users.length + 1
        users.push({ id, name, email })

        return res
            .status(201)
            .json({ message: 'User created succesfully' })
    }
    
    res
        .status(400)
        .json({ message: 'Failed to create. Required name and email'})
})


module.exports = router