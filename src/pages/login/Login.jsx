import './Login.css'
import React, { useState } from 'react'

import Button from '../../components/common/buttons/Buttons'

function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    //Handle the logic
    console.log(`Email:${userName} Password: ${password}`)
  }
  return (
    <div className="login__container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login__container-label">Login</h2>
        <div className="login__container-username-block">
          <label htmlFor="userName" className="login__container-label"></label>

          <input
            id="userName"
            className="login__container-input"
            placeholder="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoComplete="username"
          ></input>
        </div>
        <label htmlFor="password" className="login__container-label">
          <input
            id="password"
            className="login__container-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          ></input>
        </label>
        <div className="login__button-container">
          <div className="login__button-container-usernamepasswd">
            <a href="/forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot username?
            </a>
          </div>
          <Button
            text="Submit"
            variant="login__button-container-submit"
            type="submit"
          ></Button>
        </div>
        <div className="login__container-rememberme">
          <span className="login__container-span">Remember me</span>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          ></input>
        </div>
      </form>
    </div>
  )
}
export default Login
