import ContainerSeperation from '../../../common/containerSeperation/ContainerSeperation'
import HowItWorkContainer from '../../../containers/homePageContainers/howItWorksContainer/HowItWorksContainer'
import IntroContainer from '../../../containers/homePageContainers/introContainer/IntroContainer'
const HomePageMain = ({}) => (
  <>
    <IntroContainer></IntroContainer>
    <ContainerSeperation text={`How It Works`}></ContainerSeperation>
    <HowItWorkContainer></HowItWorkContainer>
    <ContainerSeperation text={`Testimonials`}></ContainerSeperation>
  </>
)
export default HomePageMain
