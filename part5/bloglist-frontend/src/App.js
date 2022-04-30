import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleNewBlogPost = async e => {
    e.preventDefault()
    
    const response = await blogService.save({
      title, author, url
    })

    console.log(response)

  }

  const loginForm = () => (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} >
          </input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type="submit"> Login</button>
      </form>
    </>
  )

  const displayBlogs = () => (
    <>
      <h2>List of Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const newBlog = () => (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleNewBlogPost}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}>
          </input>
        </div>
        <div><label htmlFor='author'>Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}>
          </input></div>
        <div>
          <label htmlFor='URL'>URL</label>
          <input
            type="text"
            id="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}>
          </input>
        </div>
        <button type="submit">Create new blog post</button>
      </form>
    </>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ? loginForm()
        : <>
          <div>{user.name} is logged in</div>
          <button onClick={handleLogout}>Logout</button>
          {displayBlogs()}
          {newBlog()}
        </>
      }

    </div>
  )
}

export default App
