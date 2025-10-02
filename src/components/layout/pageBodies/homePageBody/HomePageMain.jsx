import ContainerSeperation from '../../../common/containerSeperation/ContainerSeperation'
import HowItWorkContainer from '../../../containers/homePageContainers/howItWorksContainer/HowItWorksContainer'
import IntroContainer from '../../../containers/homePageContainers/introContainer/IntroContainer'
import HomePageFooter from '../../pageFooters/homePageFooter/HomePageFooter'
const HomePageMain = () => (
  <>
    <IntroContainer />
    <ContainerSeperation text={`How It Works`} />
    <HowItWorkContainer />
    <HomePageFooter />
  </>
)
export default HomePageMain
