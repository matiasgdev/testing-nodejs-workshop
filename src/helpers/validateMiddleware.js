module.exports = (request, response, next) => {
    const {id} = request.params
    
    if (isNaN(Number(id)))
        return response.status(400).json({ 
            message: 'Must provide a valid ID [number]',
            status: 400,
            code: '4112'
        })
    
    next()
}