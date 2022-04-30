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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
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

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ? loginForm()
        : <>
          <div>{user.name} is logged in</div>
          <button onClick={handleLogout}>Logout</button>
          {displayBlogs()}
          </>
      }

    </div>
  )
}

export default App
