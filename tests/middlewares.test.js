const validateMiddleware = require('../src/helpers/validateMiddleware')

const next = jest.fn()

const response = {
    status: jest.fn(() => response),
    json: jest.fn()
}

const request = {}

beforeEach(() => {
    jest.clearAllMocks()
})


describe('validateMiddleware', () => {

    test('fires next event with a valid id', () => {

        validateMiddleware(request, response, next, '1')

        expect(next).toHaveBeenCalled()

    })

    test('should response with status 400', () => {

        validateMiddleware(request, response, next, 'invalid')

        expect(response.status).toHaveBeenCalledWith(400)
        expect(next).not.toHaveBeenCalled()
        expect(response.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Must provide a valid ID [number]'
            })
        )
    })

})