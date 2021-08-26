const validateMiddleware = require('../src/helpers/validateMiddleware')

const next = jest.fn()

const response = {
    status: jest.fn(() => response),
    json: jest.fn()
}

const createReqObj = (id) => ({
    params: {
        id
    }
})

beforeEach(() => {
    jest.clearAllMocks()
})


describe('validateMiddleware', () => {

    test('fires next event with a valid id', () => {

        validateMiddleware(createReqObj('1'), response, next)

        expect(next).toHaveBeenCalled()

    })

    test('not call next event with a invalid id', () => {

        validateMiddleware(createReqObj('invalid'), response, next)

        expect(next).not.toHaveBeenCalled()

    })

    test('should response with status 400', () => {

        validateMiddleware(createReqObj('invalid'), response, next)

        expect(response.status).toHaveBeenCalledWith(400)
        
        expect(response.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Must provide a valid ID [number]'
            })
        )
    })

})