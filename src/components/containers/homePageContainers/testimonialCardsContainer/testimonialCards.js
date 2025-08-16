import { participants } from '../../../../utils/constants/participantsConstants'
let id = 0
const testimonialCards = participants.map((participant, index) => ({
  id: index,
  participantName: participant.profileInfo.name,
  recentDonation: participant.donationData.recentDonation,
}))
export default testimonialCards
