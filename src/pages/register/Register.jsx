import './Register.css'
import React, { useState, useContext } from 'react'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'
import Checkbox from '../../components/common/checbox/Checkbox'
import { ParticipantContext } from '../../context/ParticipantContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../api'

function Register() {
  const navigate = useNavigate()
  const { loading, error, setError } = useContext(ParticipantContext)
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    zipCode: '',
    termsCheckbox: false,
  })
  const [success, setSuccess] = useState('')
  const [localLoading, setLocalLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  if (loading) {
    return (
      <div className="register__container">
        <div>Loading...</div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.termsCheckbox) {
      setError('You must accept the terms and conditions')
      return
    }
    setLocalLoading(true)

    // Backend expects "zipcode", not "zipCode"

    const payload = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      zipcode: formData.zipCode,
    }
    apiRequest('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((data) => {
        setSuccess('Registration succesful! Please log in')
        setFormData({
          userName: '',
          password: '',
          email: '',
          zipCode: '',
          termsCheckbox: false,
        })
        setTimeout(() => navigate('/login'), 1500)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setLocalLoading(false))
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
