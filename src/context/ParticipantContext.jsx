import { createContext, useContext, useState } from 'react'
import Avatar from '../assets/images/avatar.jpg'
import donationsData from '../constants/donationsData'
const ParticipantContext = createContext({ participantsData: [] })
export const ParticipantProvider = ({ children }) => {
  const participantsData = [
    {
      //change all the properties with this one
      id: 1,
      avatar: Avatar,
      printName: 'Doruk Kocausta',
      userName: 'Dkocausta34',
      password: 'old_password',
      email: 'dkocausta@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5552345671',
      country: 'USA',
      state: 'California',
      city: 'San Diego',
      address: '42 Ocean Breeze Ave',
      zipCode: '92107',
      totalDonationCount: 25,
      currentDonations: 3,
      totalWeightDonation: 120,
      recentDonation: 30,
      totalPersonHelped: 95,
      totalNetTaxBack: 350,
      donationsList: donationsData,
    },
    {
      id: 2,
      username: 'mangoqueen',
      email: 'mangoqueen@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5558763450',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      adress: '77 Maple Leaf Dr',
      zipCode: 'M4B1B5',
      totalWeightDonation: 340,
      recentDonation: 80,
      totalPersonHelped: 250,
    },
    {
      id: 3,
      username: 'rocketman',
      email: 'rocketman@example.com',
      karm: false,
      image: '../../assets/images/chef.svg',
      phone: '5551119087',
      country: 'Germany',
      state: 'Bavaria',
      city: 'Munich',
      adress: '18 Königstrasse',
      zipCode: '80331',
      totalWeightDonation: 90,
      recentDonation: 20,
      totalPersonHelped: 75,
    },
    {
      id: 4,
      username: 'pastaLover',
      email: 'pasta@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5557643821',
      country: 'Italy',
      state: 'Tuscany',
      city: 'Florence',
      adress: '9 Via Roma',
      zipCode: '50123',
      totalWeightDonation: 220,
      recentDonation: 55,
      totalPersonHelped: 180,
    },
    {
      id: 5,
      username: 'sunnyday',
      email: 'sunnyday@example.com',
      karm: false,
      image: '../../assets/images/chef.svg',
      phone: '5556662020',
      country: 'Australia',
      state: 'Victoria',
      city: 'Melbourne',
      adress: '15 Sunset Blvd',
      zipCode: '3000',
      totalWeightDonation: 410,
      recentDonation: 100,
      totalPersonHelped: 325,
    },
    {
      id: 6,
      username: 'ninjacat',
      email: 'ninjacat@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5558896543',
      country: 'Japan',
      state: 'Tokyo',
      city: 'Shinjuku',
      adress: '202 Sakura St',
      zipCode: '160-0022',
      totalWeightDonation: 175,
      recentDonation: 45,
      totalPersonHelped: 120,
    },
    {
      id: 7,
      username: 'desertrose',
      email: 'desertrose@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5554449932',
      country: 'UAE',
      state: 'Dubai',
      city: 'Dubai',
      adress: 'Tower 55 Sheikh Zayed Rd',
      zipCode: '00000',
      totalWeightDonation: 500,
      recentDonation: 125,
      totalPersonHelped: 400,
    },
    {
      id: 8,
      username: 'forestking',
      email: 'forestking@example.com',
      karm: false,
      image: '../../assets/images/chef.svg',
      phone: '5552238790',
      country: 'Brazil',
      state: 'São Paulo',
      city: 'São Paulo',
      adress: '88 Rua Verde',
      zipCode: '04567-890',
      totalWeightDonation: 280,
      recentDonation: 70,
      totalPersonHelped: 190,
    },
    {
      id: 9,
      username: 'coderbee',
      email: 'coderbee@example.com',
      karm: true,
      image: '../../assets/images/chef.svg',
      phone: '5557771111',
      country: 'India',
      state: 'Karnataka',
      city: 'Bangalore',
      adress: '5 MG Road',
      zipCode: '560001',
      totalWeightDonation: 330,
      recentDonation: 85,
      totalPersonHelped: 260,
    },
    {
      id: 10,
      username: 'snowwolf',
      email: 'snowwolf@example.com',
      karm: false,
      image: '../../assets/images/chef.svg',
      phone: '5559998787',
      country: 'Norway',
      state: 'Oslo',
      city: 'Oslo',
      adress: '31 Fjordveien',
      zipCode: '0250',
      totalWeightDonation: 150,
      recentDonation: 35,
      totalPersonHelped: 100,
    },
  ]

  const [participant, setParticipant] = useState(participantsData[0])
  const toggleKarm = (target = 'participant') => {
    setParticipant((prev) => {
      if (target === 'donation') {
        const updatedDonationsList = [...prev.donationsList]
        updatedDonationsList[0] = {
          ...updatedDonationsList[0],
          karm: !updatedDonationsList[0].karm,
        }
        return {
          ...prev,
          donationsList: updatedDonationsList,
        }
      } else {
        return {
          ...prev,
          karm: !prev.karm,
        }
      }
    })
  }
  return (
    <ParticipantContext
      value={{ participant, participantsData, setParticipant, toggleKarm }}
    >
      {children}
    </ParticipantContext>
  )
}
export const useParticipant = () => useContext(ParticipantContext)
