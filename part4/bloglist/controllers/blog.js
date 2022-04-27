const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../model/blog')
const User = require('../model/user')

const getTokenFrom = (request) => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const user = request.user
    const userId = user.id.toString()
    const blog = await Blog.findById(request.params.id)
    const blogUserId = blog.user.toString()
    try {
        if(userId === blogUserId) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({error: 'user is not authorized to delete this blog post'})
        }
    } catch(exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        _id: request.params.id
    })

    try {
        const updatedBlog = await Blog
            .findByIdAndUpdate(request.params.id, blog, {new: true})
        response.status(200).json(updatedBlog)
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter