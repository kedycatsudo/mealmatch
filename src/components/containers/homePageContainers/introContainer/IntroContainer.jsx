import Button from '../../../common/buttons/Buttons'
import { ParticipantContext } from '../../../../context/ParticipantContext'
import './IntroContainer.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const IntroContainer = () => {
  const { currentUser, loading } = useContext(ParticipantContext)
  const navigate = useNavigate()

  return (
    <div className="intro__container">
      <div className="intro__container_sloganbtns">
        <h1 className="intro__container_slogan">Share Meals Reduce Waste</h1>
        <div className="intro__container_buttons">
          <Button
            className="intro__mobile-btn"
            variant="secondary"
            text="Post Food"
            onClick={() => {
              currentUser ? navigate('/shareFood') : navigate('/login')
            }}
            disabled={loading}
          />
          <Button
            className="intro__mobile-btn"
            variant="secondary"
            text="Find Meals Nearby"
            onClick={() => {
              currentUser ? navigate('/exploreFood') : navigate('/login')
            }}
            disabled={loading}
          />
        </div>
      </div>
      <p className="intro__container__ntroduction">
        Every day, individuals, catering companies, and bulk kitchens throw away
        perfectly good food due to lack of an easy way to give it away before it
        expires. Meanwhile, many people in the same communities go hungry or
        struggle to afford groceries. MealMatch creates a local sharing economy
        for surplus meals, groceries, and ingredients — reducing waste and
        helping those in need.
      </p>
    </div>
  )
}
export default IntroContainer
