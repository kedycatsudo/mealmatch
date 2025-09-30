import './Login.css'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'
import Checkbox from '../../components/common/checbox/Checkbox'
import { FaLessThan } from 'react-icons/fa'

function Login() {
  const navigate = useNavigate()
  const navigateTo = (index) => {
    navigate(`/${index}`)
  }
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: false,
  })
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //Handle the logic
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/jason' },
      body: JSON.stringify({
        username: formData.userName,
        password: formData.password,
        rememberMe: formData.rememberMe,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Newtwork response was not ok')
        } else {
          setFormData({ userName: '', password: '' })
          navigateTo('menu')
          return res.json()
        }
      })
      .catch((e) => {
        console.error('Login Failed', e.message)
        navigateTo('register')
      })
  }
  return (
    <div className="login__container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login__container-title">Login</h2>
        <Input
          id="userName"
          type={'text'}
          variant="login"
          placeholder="username"
          required={true}
          value={formData.userName}
          onChange={handleChange}
        ></Input>

        <Input
          id="password"
          type={'password'}
          variant="login"
          placeholder="password"
          required={true}
          value={formData.password}
          onChange={handleChange}
        ></Input>

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
        <div className="login__container-rememberme-container">
          <Checkbox
            id="rememberMe"
            onChange={handleChange}
            checked={formData.rememberMe}
            text="Remember me"
            type="checkbox"
          ></Checkbox>
        </div>
      </form>
    </div>
  )
}
export default Login
