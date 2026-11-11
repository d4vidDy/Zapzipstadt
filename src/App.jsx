import SmoothScrolling from './components/SmoothScrolling.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import Attractions from './sections/Attractions.jsx'
import City from './sections/City.jsx'
import History from './sections/History.jsx'
import Home from './sections/Home.jsx'
import Sources from './sections/Sources.jsx'
import Tourism from './sections/Tourism.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <SmoothScrolling />
      <SiteHeader />
      <main className="site-content">
        <Home />
        <History />
        <City />
        <Tourism />
        <Attractions />
        <Sources />
      </main>
    </>
  )
}
