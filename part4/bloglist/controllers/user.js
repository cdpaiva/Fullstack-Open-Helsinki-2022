const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
})

userRouter.post('/', async (request, response, next) => {
    const user = request.body

    if(user.password.length < 4) {
        response.status(401).json({error: 'Password must be at least 4 characters long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash: passwordHash,
        blogs: []
    })

    try {
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

module.exports = userRouter