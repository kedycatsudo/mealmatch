import './Login.css'
import React, { useState } from 'react'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'

function Login() {
  const [formData, setFormData] = useState({ userName: '', password: '' })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //Handle the logic
    console.log(`Email:${formData.userName} Password: ${formData.password}`)
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/jason' },
      body: JSON.stringify({
        username: formData.userName,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Newtwork response was not ok')
        } else {
          setFormData({ userName: '', password: '' })
          return res.json()
        }
      })
      .catch((e) => {
        console.error('Login Failed', e.message)
      })
  }
  return (
    <div className="login__container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login__container-label">Login</h2>
        <Input
          id="userName"
          type={'text'}
          variant="login"
          placeholder="username"
          required={true}
          value={formData.userName}
          onChange={handleChange}
        ></Input>
        <div className="login__container-username-block">
          <Input
            id="password"
            type={'password'}
            variant="login"
            placeholder="password"
            required={true}
            value={formData.password}
            onChange={handleChange}
          ></Input>
        </div>
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
            //checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          ></input>
        </div>
      </form>
    </div>
  )
}
export default Login
