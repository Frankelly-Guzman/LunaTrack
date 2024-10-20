import React from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaSearch, FaInfoCircle } from "react-icons/fa";
import { LuMoonStar } from "react-icons/lu";

const NavBar = () => {
  return (
    <motion.div 
    className='flex min-h-1/2 w-1/6 gap-2 l-0 m-4 bg-slate-800/80 items-center justify-center flex-col rounded-lg' 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 3}}
    >
       <div className='flex flex-row gap-2 py-10 text-white'>
        <LuMoonStar className='size-10'/>
        <h1 className='text-lg font-semibold'>LunaTrack</h1>
       </div>
       <div className='flex flex-col gap-10'>
            <motion.button className='text-white flex gap-2 items-center justify-center'
                whileHover={{ scale: 1.1}}
            >
                    <FaHome className='size-8'/>
                    <p>Dashboard</p>
            </motion.button>
            <motion.button className='text-white flex gap-2'
                whileHover={{ scale: 1.1}}
            >
                    <FaSearch className='size-8'/>
                    <p>Search</p>
            </motion.button>
            <motion.button className='text-white flex gap-2'
                whileHover={{ scale: 1.1}}
            >
                    <FaInfoCircle className='size-8'/>
                    <p>About</p>
            </motion.button>
       </div>
       
    </motion.div>
  )
}

export default NavBar