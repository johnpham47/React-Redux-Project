import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(1)

    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    function handleLogin() {
        console.log("Logging in...")
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(response => response.json())
        .then(auth => {
            if (auth.isAuthenticated) {
                props.onLogin()
                props.history.push('/')
            }
            else {
                setError({
                    message: 2
                })
            }

        })
    }
    return (
        <div>
            <h1>Login</h1>
            {error.message === 2 && <p>Invalid credentials, please try again.</p>}
            <label>Username</label>
            <input onChange={handleInput} type="text" name="username" />
            <label>Password</label>
            <input onChange={handleInput} type="text" name="password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch({ type: 'LOGIN'}),
        onLogout: () => dispatch({ type: 'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps) (withRouter(Login))