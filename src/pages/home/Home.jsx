import HomePageMain from '../../components/layout/pageBodies/homePageBody/HomePageMain'
import HomePageHeader from '../../components/layout/pageHeaders/homepageHeader/HomePageHeader'
import './Home.css'
const HomePage = ({}) => (
  <div className="page">
    <div className="page__content">
      <header>
        <HomePageHeader></HomePageHeader>
      </header>
      <main>
        <HomePageMain></HomePageMain>
      </main>
    </div>
  </div>
)
export default HomePage
