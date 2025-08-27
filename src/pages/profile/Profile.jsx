import ContainerSeperation from '../../components/common/containerSeperation/ContainerSeperation'
import ProfilePageHeader from '../../components/layout/pageHeaders/profilePageHeader/ProfilePageHeader'
import ProfilePageFooter from '../../components/layout/pageFooters/homePageFooter/profilePageFooter/ProfilePageFooter'
import ProfilePageBody from '../../components/layout/pageBodies/profilePageBody/ProfilePageBody'
const Profile = ({}) => {
  return (
    <div className="page">
      <div className="page__content">
        <ProfilePageHeader></ProfilePageHeader>
        <ContainerSeperation text={'Posted Donations'}></ContainerSeperation>
        <ProfilePageBody></ProfilePageBody>
        <ProfilePageFooter></ProfilePageFooter>
      </div>
    </div>
  )
}
export default Profile
