import HeaderTop from './container/HomePage/HeaderTop'
import NavbarIndex from './components/navbar/NavbarIndex'
import BannerSection from './container/HomePage/BannerSection'
import AboutUs from './container/HomePage/AboutUs'
import Vission from './container/HomePage/Vission'
import Mission from './container/HomePage/Mission'
import Objectives from './container/HomePage/Objectives'
import LatestNews from './container/HomePage/LatestNews'
import ContactSection from './container/HomePage/ContactSection'
import Footer from './components/footer'

function App() {

  return (
    <div>
        <HeaderTop />
      <NavbarIndex />
      <BannerSection />
      <AboutUs />
      <Vission />
      <Mission />
      <Objectives />
      <LatestNews />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
