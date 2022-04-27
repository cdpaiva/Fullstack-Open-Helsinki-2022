const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../model/user')

const api = supertest(app)

test('db loads initial passed objects', async () => {
    const users = await api.get('/api/users')

    expect(users.body).toHaveLength(initialUsers.length)
})

test('users with no name are not created', async () => {
    const invalidUser = {
        username: "123455",
        password: "545231123"
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

    const users = await api.get('/api/users')

    expect(users.body).toHaveLength(initialUsers.length)
})

test('invalid add user results in suitable error message', async () => {
    const invalidUser = {
        username: "123455",
        password: "545231123"
    }

    const res = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

    const errorMsg = res.body.error

    expect(errorMsg).toMatch(/User validation failed/)
})

const initialUsers = [
    {
        name: "Phillip Hendrick",
        username: "phend",
        passwordHash: "$3b$70$IGAx.oxkbOxEzd70BN5JfuWBgereVp0SNuwyLguLMoRbu7hDpfGst"
    },
    {
        name: "Maria Simmons",
        username: "msimms",
        passwordHash: "$2b$10$IGAx.oxkbOxEzd70BN5JfuWBJerDVp0SNuwyLguLMoRbu7hDpfGrq"
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of initialUsers) {
        let userObj = new User(user)
        await userObj.save()
    }
})

afterAll(() => {
    mongoose.connection.close()
})