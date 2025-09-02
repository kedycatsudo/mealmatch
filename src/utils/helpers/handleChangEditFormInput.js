export default function handleChangeEditFormInput(setParticipant) {
  return function (e) {
    const { name, value } = e.target

    setParticipant((prev) => ({ ...prev, [name]: value }))
  }
}
