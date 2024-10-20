import React from 'react'
import { motion } from 'framer-motion'
import NavBar from './Components/NavBar'
import MoonPhaseContainer from './Components/MoonPhaseContainer'

const App = () => {
  return (
    <motion.div className='flex min-h-screen min-w-screen bg-starry-pattern'>
      <NavBar />
      <MoonPhaseContainer />
    </motion.div>
  )
}

export default App