import { useEffect } from 'react'

const UseEffectShowModal = ({ showModal }) =>
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showModal])

export default UseEffectShowModal
