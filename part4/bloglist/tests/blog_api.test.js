const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')

const api = supertest(app)

test('blogs are returned as json', () => {
    api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('test db loads all initial passed objects', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Vue.js is great",
        author: "Evan Wu",
        url: "https://www.vuepower.com",
        likes: 55
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const blogTitles = res.body.map(b => b.title)

    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(blogTitles).toContain('Vue.js is great')
})

test('a blog with no title cannot be added', async () => {
    const newBlog = {
        author: "Evan Wu",
        url: "https://www.vuepower.com",
        likes: 55
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const res = await api.get('/api/blogs')
    
    expect(res.body).toHaveLength(initialBlogs.length)
})

test('a blog with no url cannot be added', async () => {
    const newBlog = {
        title: "New sourceless blog",
        author: "Evan Wu",
        likes: 55
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const res = await api.get('/api/blogs')
    
    expect(res.body).toHaveLength(initialBlogs.length)
})

test('a blog can be added without likes field', async () => {
    // Creates a blog with no likes
    const newBlog = {
        title: "Unlikely to be liked post",
        author: "Unknown",
        url: "https://www.vuepower.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const res = await api.get('/api/blogs')
    const blogLikes = res.body.map(blog => blog.likes)
    
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(blogLikes).toContain(0)
})

test('a blog unique identifier is named id', async () => {
    const blogs = await api.get('/api/blogs')

    const firstBlog = blogs.body[0]

    expect(firstBlog.id).toBeDefined()
})

test('can delete a blog based on id', async () => {
    const all = await api.get('/api/blogs')
    const firstBlogId = all.body[0].id

    await api
        .delete(`/api/blogs/${firstBlogId}`)
        .expect(204)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length-1)
})

test('can update a blog based on id', async () => {
    const all = await api.get('/api/blogs')
    const firstBlogId = all.body[0].id

    console.log(firstBlogId)

    const blogToUpdate = {
        title: "Updated blog title",
        author: "Evan Wu",
        url: "https://www.vuepower.com",
        likes: 55
    }

    await api
        .put(`/api/blogs/${firstBlogId}`)
        .send(blogToUpdate)
        .expect(200)

    const res = await api.get('/api/blogs')
    const blogTitles = res.body.map(b => b.title)

    expect(blogTitles).toContain('Updated blog title')
})


const initialBlogs = [
    {
        title: "Creating a react app",
        author: "React tutorials",
        url: "https://www.reacttutorials.com",
        likes: 10
    },
    {
        title: "Using Jest",
        author: "Jest tester",
        url: "https://www.jestintime.com/usingjest",
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})

afterAll(() => {
    mongoose.connection.close()
})