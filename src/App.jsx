import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Horor from './Horor'
import Home from './Home'
import Navbar from './components/Navbar'
import Adventure from './Adventure'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horor" element={<Horor />} />
        <Route path="/adventure" element={<Adventure />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App