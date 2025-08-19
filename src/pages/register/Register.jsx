import './Register.css'
import React, { useState } from 'react'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'
import Checkbox from '../../components/common/checbox/Checkbox'

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    zipCode: '',
    termsCheckbox: false,
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
    console.log(
      `Username:${formData.userName} Password: ${formData.password} Email:${formData.email} ZipCode:${formData.zipCode}`
    )
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/jason' },
      body: JSON.stringify({
        username: formData.userName,
        password: formData.password,
        email: formData.email,
        zipCode: formData.zipCode,
        termsCheckbox: formData.termsCheckbox,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Newtwork response was not ok')
        } else {
          setFormData({ userName: '', password: '', email: '', zipCode: '' })
          return res.json()
        }
      })
      .catch((e) => {
        console.error('Register Failed', e.message)
      })
  }
  return (
    <div className="register__container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register__container-label">Register</h2>
        <Input
          id="userName"
          type={'text'}
          variant="Register"
          placeholder="username"
          required={true}
          value={formData.userName}
          onChange={handleChange}
        ></Input>
        <div className="register__container-username-block">
          <Input
            id="password"
            type={'password'}
            variant="register"
            placeholder="password"
            required={true}
            value={formData.password}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="register__container-username-block">
          <Input
            id="email"
            type={'email'}
            variant="register"
            placeholder="email"
            required={true}
            value={formData.email}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="register__container-username-block">
          <Input
            id="zipCode"
            type={'text'}
            variant="register"
            placeholder="zipCode"
            required={false}
            value={formData.zipCode}
            onChange={handleChange}
          ></Input>
        </div>
        <Checkbox
          required={true}
          id="termsCheckbox"
          onChange={handleChange}
          checked={formData.termsCheckbox}
          text="I accept the terms and conditions"
          type="checkbox"
        ></Checkbox>
        <div className="register__button-container">
          <Button
            text="Submit"
            variant="register__button-container-submit"
            type="submit"
          ></Button>
        </div>
      </form>
    </div>
  )
}
export default Register
