const buildAddress = (participant) => {
  if (!participant) return ''
  const street = participant.adress || participant.address || ''
  const city = participant.city || ''
  const state = participant.state || ''
  const zip = participant.zipCode || participant.zip || ''
  const country = participant.country || ''
  return `${street}, ${city}, ${state} ${zip}, ${country}`
    .replace(/\s+,/g, '')
    .trim()
}
export default buildAddress
