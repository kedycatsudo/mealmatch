import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ProfilePageHeader from '../../components/layout/pageHeaders/profilePageHeader/ProfilePageHeader'
import PostedDonationsContainer from '../../components/containers/profilePageContainers/postadDonationsContainer/PostedDonationsContainer'
import ProfilePageBody from '../../components/layout/pageBodies/profilePageBody/ProfilePageBody'
import Button from '../../components/common/buttons/Buttons'
const Profile = ({}) => {
  return (
    <>
      <ProfilePageHeader></ProfilePageHeader>
      <ContainerSeperation text={'Postad Donations'}></ContainerSeperation>
      <ProfilePageBody></ProfilePageBody>
    </>
  )
}
export default Profile
