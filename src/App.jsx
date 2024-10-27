import React from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import MoonPhaseContainer from './Pages/MoonPhaseContainer'
import DetailsPage from './Pages/DetailsPage'
import About from './Pages/About'
import NotFound from './Pages/NotFound'

const App = () => {
  return (
    <motion.div className='flex min-h-screen min-w-screen bg-starry-pattern'>
        <NavBar />
        <Routes>
          <Route path='/' element={<MoonPhaseContainer />} />
          <Route path='/details/:date' element={<DetailsPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </motion.div>
  )
}

export default App