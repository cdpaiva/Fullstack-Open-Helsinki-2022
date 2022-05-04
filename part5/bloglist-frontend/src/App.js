import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Toggable from './components/Toggable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [newPostMessage, setNewPostMessage] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(sortedBlogs(blogs))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
        }
    }, [])

    const newBlogPostRef = useRef()

    const sortedBlogs = (blogs) =>
        blogs.sort((a,b) => b.likes-a.likes)

    const login = async (user) => {
        try {
            const loggedUser = await loginService.login(user)
            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(loggedUser)
            )
            blogService.setToken(loggedUser.token)
            setUser(loggedUser)
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
    }

    const createBlog = async blog => {
        newBlogPostRef.current.toggleVisibility()
        const response = await blogService.save(blog)
        setNewPostMessage(`New blog ${response.title} by ${response.author}`)
        setTimeout(() => setNewPostMessage(''), 5000)
    }

    const addLike = async blog => {
        const response = await blogService.update(blog)
        setNewPostMessage(`You liked ${response.title}`)
        setTimeout(() => setNewPostMessage(''), 5000)
    }

    const removeBlog = id => {
        blogService.remove(id)
        setErrorMessage('Blog removed')
        setTimeout(() => setErrorMessage(''), 5000)
    }

    const displayBlogs = () => (
        <>
            <h2>List of Blogs</h2>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    removeBlog={removeBlog}
                />
            )}
        </>
    )

    return (
        <div>
            <Notification message={errorMessage} status="error" />
            <Notification message={newPostMessage} status="success" />
            {user === null
                ? <LoginForm login={login}/>
                : <>
                    <div>{user.name} is logged in</div>
                    <button onClick={handleLogout}>Logout</button>
                    <Toggable buttonLabel="New blog post" ref={newBlogPostRef}>
                        <NewBlogForm createBlog={createBlog} />
                    </Toggable>
                    {displayBlogs()}
                </>
            }
        </div>
    )
}

export default App