import React from 'react';
import PhaseTable from '../Components/PhaseTable';
import AppRow from '../Components/AppRow';
import { motion } from 'framer-motion';

const MoonPhaseContainer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col h-screen w-full mr-4 mb-4 gap-10 rounded-lg'> {/* Use h-screen to fill the viewport height */}
      {/* AppRow takes up 1/4 of the height */}
      <div className='h-1/4'> {/* This div will take up 25% of the container */}
        <AppRow />
      </div>
      {/* PhaseFilter and PhaseTable take up the remaining height */}
      <div className='bg-slate-800/80 flex flex-col flex-grow justify-center items-center h-3/4 text-center rounded-lg'>
        <PhaseTable />
      </div>
    </motion.div>
  );
};

export default MoonPhaseContainer;