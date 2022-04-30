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

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username, password
      })
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)} >
        </input>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}>
        </input>
        <button type="submit"> Login</button>
      </form>
    </>
  )

  const displayBlogs = () => (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>

      <Notification message={errorMessage} />

      {user===null
        ? loginForm()
        : <>
            <p>{user.name} is logged in</p>
            {displayBlogs()}
          </>
      }

    </div>
  )
}

export default App
