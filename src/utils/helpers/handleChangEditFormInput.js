export default function handleFormInput(setParticipant) {
  return function (e) {
    const { name, value } = e.target
    // List of donation properties you want to support
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
    if (donationFields.includes(name)) {
      // Update the first donation in donationsList
      setParticipant((prev) => {
        const updatedDonationsList = [...prev.donationsList]
        updatedDonationsList[0] = {
          ...updatedDonationsList[0],
          [name]: value,
        }
        return { ...prev, donationsList: updatedDonationsList }
      })
    } else {
      // Update top-level participant property
      setParticipant((prev) => ({ ...prev, [name]: value }))
    }
  }
}
