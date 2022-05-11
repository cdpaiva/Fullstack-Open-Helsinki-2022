import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = e => {
        e.preventDefault()
        login({ username, password })
        setUsername('')
        setPassword('')
    }

    return <>
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
            <button type="submit" id="login-button">Login</button>
        </form>
    </>
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

export default LoginForm