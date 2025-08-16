import ContainerSeperation from '../../../common/containerSeperation/ContainerSeperation'
import HowItWorkContainer from '../../../containers/homePageContainers/howItWorksContainer/HowItWorksContainer'
import TestimonialCardsContainer from '../../../containers/homePageContainers/testimonialCardsContainer/TestimonialCarsContainer'
import IntroContainer from '../../../containers/homePageContainers/introContainer/IntroContainer'
import ParticipantsContainer from '../../../containers/homePageContainers/participantsContainer/ParticipantsContainer'
const HomePageMain = ({}) => (
  <>
    <IntroContainer></IntroContainer>
    <ContainerSeperation text={`How It Works`}></ContainerSeperation>
    <HowItWorkContainer></HowItWorkContainer>
    <ContainerSeperation text={`Testimonials`}></ContainerSeperation>
    <TestimonialCardsContainer></TestimonialCardsContainer>
    <ContainerSeperation text={`Participants`}></ContainerSeperation>
    <ParticipantsContainer></ParticipantsContainer>
  </>
)
export default HomePageMain
