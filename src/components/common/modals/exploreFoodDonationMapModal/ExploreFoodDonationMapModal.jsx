import React, { forwardRef } from 'react'
import Button from '../../buttons/Buttons'
import './ExploreFoodDonationMapModal.css'

const ExploreFoodDonationMapModal = forwardRef(
  ({ onClose, confirmation }, ref) => {
    return <div className="map__container" ref={ref} tabIndex={-1}></div>
  }
)

export default ExploreFoodDonationMapModal
