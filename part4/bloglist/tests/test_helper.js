const Blog = require('../model/blog')
const User = require('../model/user')

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

const initialUsers = [
    {
        username: "Terry Pratchett22",
        name: "Sir Terry",
        password: "rincewind123"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const userTokens = []

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, userTokens }