import './Register.css'
import React, { useState, useContext } from 'react'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'
import Checkbox from '../../components/common/checbox/Checkbox'
import { ParticipantContext } from '../../context/ParticipantContext'
import { Navigate, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const { users, setCurrentUser, loading } = useContext(ParticipantContext)
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    zipCode: '',
    termsCheckbox: false,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Simulate registration logic for MVP
    // Check if username or email already exists
    const userExists = users.some(
      (u) => u.userName === formData.userName || u.email === formData.email
    )
    if (userExists) {
      setError('Username or email already registered.')
      return
    }
    if (!formData.termsCheckbox) {
      setError('You must accept the terms and conditions.')
      return
    }
    // For MVP, just add user to context
    const newUser = {
      _id: Date.now().toString(),
      userName: formData.userName,
      printName: formData.userName,
      email: formData.email,
      zipCode: formData.zipCode,
      // password is not stored for MVP
    }
    users.push(newUser) // This won't persist; for MVP only
    setCurrentUser(newUser)
    setSuccess('Registration successful! You are now logged in.')
    setFormData({
      userName: '',
      password: '',
      email: '',
      zipCode: '',
      termsCheckbox: false,
    })
  }

  if (loading) {
    return (
      <div className="register__container">
        <div>Loading users...</div>
      </div>
    )
  }

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register__container-label">Register</h2>
        {error && <div className="register__error">{error}</div>}
        {success && <div className="register__success">{success}</div>}
        <Input
          name="userName"
          type="text"
          variant="register"
          placeholder="Username"
          required={true}
          value={formData.userName}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          variant="register"
          placeholder="Password"
          required={true}
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          variant="register"
          placeholder="Email"
          required={true}
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="zipCode"
          type="text"
          variant="register"
          placeholder="Zip Code"
          required={false}
          value={formData.zipCode}
          onChange={handleChange}
        />
        <Checkbox
          name="termsCheckbox"
          onChange={handleChange}
          checked={formData.termsCheckbox}
          text="I accept the terms and conditions"
          type="checkbox"
        />
        <Button
          text="Submit"
          variant="login__button-container-submit"
          type="submit"
        />
        <Button
          type="button"
          variant="link"
          text="Do you have an account?"
          onClick={() => navigate('/login')}
        ></Button>
      </form>
    </div>
  )
}
export default Register
