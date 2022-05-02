const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const User = require('../model/user')
const testHelper = require('./test_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

test('blogs are returned as json', () => {
    api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('test db loads all initial passed objects', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const user = testHelper.userTokens[0]

    const newBlog = {
        title: "Vue.js is great",
        author: "Evan Wu",
        url: "https://www.vuepower.com",
        likes: 55,
        user: user._id
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${user.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const blogTitles = res.body.map(b => b.title)

    expect(res.body).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(blogTitles).toContain('Vue.js is great')
})

test('a blog with no title cannot be added', async () => {
    const user = testHelper.userTokens[0]

    const newBlog = {
        author: "Evan Wu",
        url: "https://www.vuepower.com",
        likes: 55
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${user.token}`)
        .send(newBlog)
        .expect(400)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(testHelper.initialBlogs.length)
})

test('a blog with no url cannot be added', async () => {
    const user = testHelper.userTokens[0]

    const newBlog = {
        title: "New sourceless blog",
        author: "Evan Wu",
        likes: 55
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${user.token}`)
        .send(newBlog)
        .expect(400)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(testHelper.initialBlogs.length)
})

test('a blog can be added without likes field', async () => {
    const user = testHelper.userTokens[0]

    // Creates a blog with no likes
    const newBlog = {
        title: "Unlikely to be liked post",
        author: "Unknown",
        url: "https://www.vuepower.com"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${user.token}`)
        .send(newBlog)
        .expect(201)

    const res = await api.get('/api/blogs')
    const blogLikes = res.body.map(blog => blog.likes)

    expect(res.body).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(blogLikes).toContain(0)
})

test('a blog unique identifier is named id', async () => {
    const blogs = await api.get('/api/blogs')

    const firstBlog = blogs.body[0]

    expect(firstBlog.id).toBeDefined()
})

test('can delete a blog based on id', async () => {
    const user = testHelper.userTokens[0]
    const all = await api.get('/api/blogs')
    const firstBlogId = all.body[0].id

    await api
        .delete(`/api/blogs/${firstBlogId}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(204)

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(testHelper.initialBlogs.length - 1)
})

test('can update a blog based on id', async () => {
    const all = await api.get('/api/blogs')
    const firstBlogId = all.body[0].id

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

beforeEach(async () => {
    await User.deleteMany({})
    testHelper.userTokens = []
    for (let user of testHelper.initialUsers){
      const userObject = new User(user)
      await userObject.save()
      const userForToken = { username: userObject.username, id: userObject._id}
      const token = jwt.sign(userForToken, process.env.SECRET)
      testHelper.userTokens.push({username: userObject.username, id: userObject._id, token: token})
    }
    await Blog.deleteMany({})
    for (let blog of testHelper.initialBlogs){
      const user = await User.findOne({})
      const blogObject = new Blog({...blog, user: user._id})
      await blogObject.save()
    }
})

afterAll(() => {
    mongoose.connection.close()
})