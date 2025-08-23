import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ProfilePageHeader from '../../components/layout/pageHeaders/profilePageHeader/ProfilePageHeader'
import ProfilePageBody from '../../components/layout/pageBodies/profilePageBody/ProfilePageBody'
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
