const request = require('supertest')
const {app, server} = require('../src/app')
const axios = require('axios')

jest.mock('axios')

const api = request(app)

const _mockedUsers = [
    {
        name: 'foo baz',
        email: 'baz@bar.com'
    },
    {
        name: 'baz foo',
        email: 'foo@bar.com'
    },
    {
        name: 'admin',
        email: 'me@admin.com'
    },

]

// let users

beforeAll(() => {
    // users =  await UserService.getAll()
    axios.get.mockResolvedValue({ data: _mockedUsers})
})

afterAll(() => {
    api.off()
    server.close()
})

describe('GET /users', () => {

    test('response should be json', async () => {
       await api
            .get('/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // test('data should be match', async () => {
    //     const response = await api.get('/users')

    //     expect(response.body.users).toHaveLength(users.length)
    // })


    test('data length should be match (mocked version)', async () => {
        const response = await api.get('/users')
        const { users } = response.body

        // expect(users).toHaveLength(_mockedUsers.length)
        expect(users.length).toBe(_mockedUsers.length)

    })

    test('should user admin be in the DB', async () => {
        const response = await api.get('/users')
        const { users } = response.body
        const names = users.map(user => user.name)

        expect(names).toContain('admin')
    })


})