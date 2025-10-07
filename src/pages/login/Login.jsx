import './Login.css'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/common/inputs/Inputs'
import Button from '../../components/common/buttons/Buttons'
import Checkbox from '../../components/common/checbox/Checkbox'
import { ParticipantContext } from '../../context/ParticipantContext'
import InformationModal from '../../components/common/modals/informationModals/InformationModal'

function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showForgotUsername, setShowForgotUsername] = useState(false)
  const navigate = useNavigate()
  const { users, setCurrentUser, loading } = useContext(ParticipantContext)
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return // Prevent submit during loading
    // Find user in context
    const foundUser = users.find((u) => u.userName === formData.userName)
    if (foundUser) {
      setCurrentUser(foundUser)
      setFormData({ userName: '', password: '', rememberMe: false })
      setError('')
      navigate('/menu')
    } else {
      setError('Invalid username or password')
    }
  }

  if (loading) {
    return (
      <div className="login__container">
        <div>Loading users...</div>
      </div>
    )
  }

  return (
    <div className="login__container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login__container-title">Login</h2>
        {error && <div className="login__error">{error}</div>}
        <Input
          name="userName"
          type="text"
          variant="login"
          placeholder="Username"
          required={true}
          value={formData.userName}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          variant="login"
          placeholder="Password"
          required={true}
          value={formData.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <div className="login__button-container-usernamepasswd">
            <Button
              type="button"
              text="Forgot password?"
              variant="link"
              onClick={() => setShowForgotPassword(true)}
            />
            {showForgotPassword && (
              <div className="modal-overlay">
                {/* You can add forgot password modal or message here */}
                <InformationModal
                  show={showForgotPassword}
                  onClose={() => setShowForgotPassword(false)}
                  text={
                    'Please contact with admin via email: dkocaustalinkedin@gmail.com to reset your password. '
                  }
                />
              </div>
            )}
            <Button
              type="button"
              text="Forgot username?"
              variant="link"
              onClick={() => setShowForgotUsername(true)}
            />
            {showForgotUsername && (
              <div className="modal-overlay">
                <InformationModal
                  show={showForgotUsername}
                  onClose={() => setShowForgotUsername(false)}
                  text={
                    'Please contact with admin via email: dkocaustalinkedin@gmail.com to reset your user name. '
                  }
                />
              </div>
            )}
          </div>
          <Button
            text="Submit"
            variant="login__button-container-submit"
            type="submit"
          />
        </div>
        <Button
          type="button"
          variant="link"
          text="Do you have an account?"
          onClick={() => navigate('/register')}
        ></Button>
        <div className="login__container-rememberme-container">
          <Checkbox
            name="rememberMe"
            onChange={handleChange}
            checked={formData.rememberMe}
            text="Remember me"
            type="checkbox"
          />
        </div>
      </form>
    </div>
  )
}
export default Login
