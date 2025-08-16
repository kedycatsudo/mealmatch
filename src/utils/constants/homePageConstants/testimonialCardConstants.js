import { participants } from '../participantsConstants'
export const testimonialCards = [
  {
    id: 0,
    participantName: participants[0].profileInfo.basic.name,
    recentDonation: participants[0].donationData.recentDonation,
  },
  {
    id: 1,
    participantName: participants[1].profileInfo.basic.name,
    recentDonation: participants[1].donationData.totalPersonHelped,
  },
  {
    id: 2,
    participantName: participants[2].profileInfo.basic.name,
    recentDonation: participants[2].donationData.totalPersonHelped,
  },
  {
    id: 3,
    participantName: participants[3].profileInfo.basic.name,
    recentDonation: participants[3].donationData.totalPersonHelped,
  },
  {
    id: 4,
    participantName: participants[4].profileInfo.basic.name,
    recentDonation: participants[4].donationData.totalPersonHelped,
  },
  {
    id: 5,
    participantName: participants[5].profileInfo.basic.name,
    recentDonation: participants[5].donationData.totalPersonHelped,
  },
]
