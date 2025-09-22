import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Horor from './Horor'
import Home from './Home'
import Navbar from './components/Navbar'
import Adventure from './Adventure'
import Footer from './components/Footer'
import Action from './Action'
import Scifi from './Scifi'
import Comedy from './Comedy'
import Romance from './Romance'
import Animation from './Animation'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horor" element={<Horor />} />
        <Route path="/action" element={<Action />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/scifi" element={<Scifi />} />
        <Route path="/comedy" element={<Comedy />} />
        <Route path="/romance" element={<Romance />} />
        <Route path="/animation" element={<Animation />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App