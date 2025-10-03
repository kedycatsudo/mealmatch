import { useEffect } from 'react'

function useEffectShowModal(showModal) {
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
}

export default useEffectShowModal
