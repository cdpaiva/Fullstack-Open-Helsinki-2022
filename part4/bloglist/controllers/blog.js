const blogRouter = require('express').Router()
const { baseModelName } = require('../model/blog')
const Blog = require('../model/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }

})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
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