import React from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Reduced duration for a snappier effect
      className='flex justify-center items-center text-center w-full h-screen' // Full viewport height
    >
      <div className='w-[1000px] h-[50vh] flex gap-4 flex-col justify-center items-center bg-slate-800/80 rounded-lg'> 
        {/* Set a specific width and half viewport height */}
        <h1 className='text-5xl text-white font-bold mb-4'>404 - Page Not Found ‼️</h1>
        <p className='text-lg text-gray-300'>Oops! It seems like the page you're looking for doesn't exist.</p>
        <a 
          href="/" 
          className='mt-6 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300'
        >
          Go to Home
        </a>
      </div>  
    </motion.div>
  );
};

export default NotFound;