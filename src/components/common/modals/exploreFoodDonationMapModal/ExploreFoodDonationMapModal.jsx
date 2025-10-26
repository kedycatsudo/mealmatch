import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Button from '../../buttons/Buttons'
import './ExploreFoodDonationMapModal.css'
import ConfirmationModal from '../confirmationModal/ConfirmationModal'

//loader for GoogleMaps js api

function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(`no window`)
    if (window.google && window.google.maps) return resolve(window.google.maps)
    const existing = document.querySelector('script[data-google-maps]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.setAttribute('data-google-maps', 'true')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google.maps)
    script.onerror = (err) => reject(err)
    document.head.appendChild(script)
  })
}

const ExploreFoodDonationMapModal = forwardRef(
  (
    { address, apiKey, onClose, cancelDonation, donationHold, setShowMapModal },
    ref
  ) => {
    const currentMealAddressRef = useRef(address)
    const currentMealAddress = currentMealAddressRef.curr
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const [statusMessage, setStatusMessage] = useState('')

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    useEffect(() => {
      if (!showConfirmationModal) {
        setStatusMessage('')
      }
    }, [showConfirmationModal])

    useEffect(() => {
      //if (donationHold === true) return setShowMapModal(false)
      if (!address) return
      let mapsInstance = null
      let marker = null
      let geocoder = null
      let mounted = true

      setStatusMessage('Loading map…')

      loadGoogleMaps(apiKey)
        .then((maps) => {
          if (!mounted) return
          geocoder = new maps.Geocoder()
          geocoder.geocode({ address }, (results, status) => {
            if (!mounted) return
            if (status === 'OK' && results[0]) {
              const loc = results[0].geometry.location
              mapsInstance = new maps.Map(mapRef.current, {
                center: loc,
                zoom: 14,
              })
              marker = new maps.Marker({
                position: loc,
                map: mapsInstance,
              })
              const infowindow = new maps.InfoWindow({
                content: `<div style="max-width:200px">${results[0].formatted_address}</div>`,
              })
              marker.addListener('click', () =>
                infowindow.open(mapsInstance, marker)
              )
              setStatusMessage('')
            } else {
              setStatusMessage('Could not find location; showing fallback.')
              // fallback: show iframe embed (below handled in JSX)
            }
          })
        })
        .catch((err) => {
          console.error('Google Maps failed to load', err)
          setStatusMessage('Failed to load Google Maps.')
        })

      return () => {
        mounted = false
        // cleanup if needed
        if (marker) {
          marker.setMap(null)
        }
        if (mapsInstance) {
          // no explicit mapsInstance.destroy(), but remove DOM children if needed
        }
      }
    }, [apiKey])

    // fallback embed url for when geocode or JS API fails
    const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

    return (
      <div
        className="modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="modal__content">
          <Button
            type="button"
            onClick={() => setShowConfirmationModal(true)}
            className="donation-cancel"
            text="Cancel pick up donation"
          ></Button>
          {showConfirmationModal && (
            <div className="modal__overlay">
              <ConfirmationModal
                onClose={() => setShowConfirmationModal(false)}
                onClick={() => {
                  cancelDonation()
                  setShowConfirmationModal(false)
                  onClose()
                }}
                confirmation={'Do you want to cancel pick up donation ?'}
              ></ConfirmationModal>
            </div>
          )}
          <p>{address}</p>
          {statusMessage && <p className="map__status">{statusMessage}</p>}
          {/* The interactive map (Google JS API will render here) */}
          <div
            ref={mapRef}
            style={{ width: '100%', height: '360px', borderRadius: '8px' }}
          />
          {/* If JS API didn't geocode/show map, fallback to an iframe */}
          {!window.google?.maps && (
            <div className="map__embed">
              <iframe
                title="map-embed"
                src={embedSrc}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default ExploreFoodDonationMapModal
