import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
      className='flex justify-center items-center h-screen w-screen'> {/* Full height of viewport */}
      <div className='flex justify-center items-center flex-col gap-4 px-4 w-2/3 h-auto bg-slate-800/70 rounded-lg py-8'> {/* Changed height to auto and added padding */}
        <h1 className='text-4xl text-white'>About LunaTrack</h1>
        <p className='text-lg text-white'>
          LunaTrack is a frontend application that utilizes the Weatherbit API to create dynamic API calls for fetching current data trends related to lunar phases and weather conditions.
        </p>
        <p className='text-lg text-white'>
          With LunaTrack, users can visualize the phases of the moon, understand temperature trends, and explore various atmospheric conditions.
        </p>
        <p className='text-lg text-white'>
          Key features include:
        </p>
        <ul className='text-lg text-white list-disc list-inside'>
          <li>🌕 Real-time lunar phase tracking</li>
          <li>🌤️ Weather forecasts based on location</li>
          <li>📊 Trend analysis of temperature changes</li>
          <li>🌙 Detailed insights for specific dates</li>
        </ul>
        <p className='text-lg text-white'>
          Our goal is to provide an intuitive platform for users to better understand the natural world and its cycles, fostering a deeper appreciation for the rhythms of nature.
        </p>
      </div>
    </motion.div>
  );
}

export default About;