import React from 'react';
import PhaseTable from './PhaseTable';
import AppRow from './AppRow';

const MoonPhaseContainer = () => {
  return (
    <div className='flex flex-col h-screen w-full mr-4 mb-4 gap-10'> {/* Use h-screen to fill the viewport height */}
      {/* AppRow takes up 1/4 of the height */}
      <div className='h-1/4'> {/* This div will take up 25% of the container */}
        <AppRow />
      </div>
      {/* PhaseFilter and PhaseTable take up the remaining height */}
      <div className='bg-slate-800/80 flex flex-col flex-grow justify-center items-center h-3/4 text-center'>
        <PhaseTable />
      </div>
    </div>
  );
};

export default MoonPhaseContainer;