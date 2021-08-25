const request = require('supertest')

const app = require('../src/app')

/**
 * All users
 */

describe('All users endpoint', () => {
    test('retrieve all users in a object', async () => {
        const response = await request(app).get('/users').set('Accept', 'application/json')
        
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBeDefined()
    })
})