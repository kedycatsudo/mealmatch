/**
 * Generalized handler for form inputs.
 * Updates either a nested donation field or a top-level participant field.
 * Extend donationFields as needed for future use cases.
 *
 * @param {Function} setParticipant - State setter function for participant
 * @returns {Function} - Form input change handler
 */
export default function handleFormInput(setParticipant) {
  return function (e) {
    const { name, value } = e.target

    // Update this list as your data model expands
    const donationFields = [
      'mealName',
      'allergens',
      'postDate',
      'servings',
      'useBy',
      'pickUpLoc',
      'karm',
      'live',
    ]

    setParticipant((prev) => {
      // Handle nested donation fields
      if (
        donationFields.includes(name) &&
        Array.isArray(prev.donationsList) &&
        prev.donationsList.length > 0
      ) {
        const updatedDonationsList = [...prev.donationsList]
        updatedDonationsList[0] = {
          ...updatedDonationsList[0],
          [name]: value,
        }
        return { ...prev, donationsList: updatedDonationsList }
      }

      // Handle top-level participant fields
      return { ...prev, [name]: value }
    })
  }
}
