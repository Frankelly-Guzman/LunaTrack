import React, { useState } from 'react';

const PhaseFilter = ({ selectedPhase, setSelectedPhase, selectedDate, setSelectedDate, onSubmit, onReset }) => {
  return (
    <div className='flex flex-row items-center justify-between mx-4'>
      <label htmlFor='phase-select' className='text-white mb-2'>
        Select Moon Phase:
      </label>
      <select
        id='phase-select'
        value={selectedPhase}
        onChange={(e) => setSelectedPhase(e.target.value)}
        className='mb-2 p-1 rounded'
      >
        <option value=''>All Phases</option>
        <option value='New Moon'>New Moon</option>
        <option value='Waxing Crescent'>Waxing Crescent</option>
        <option value='First Quarter'>First Quarter</option>
        <option value='Waxing Gibbous'>Waxing Gibbous</option>
        <option value='Full Moon'>Full Moon</option>
        <option value='Waning Gibbous'>Waning Gibbous</option>
        <option value='Last Quarter'>Last Quarter</option>
        <option value='Waning Crescent'>Waning Crescent</option>
      </select>

      <label htmlFor='date-input' className='text-white mb-2'>
        Enter Date:
      </label>
      <input
        type='text'
        id='date-input'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        placeholder='YYYY-MM-DD'
        className='mb-2 p-1 rounded'
      />

      <div>
        <button onClick={onSubmit} className='bg-blue-500 text-white px-4 py-2 rounded mr-2'>
          Submit
        </button>
        <button onClick={onReset} className='bg-red-500 text-white px-4 py-2 rounded'>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PhaseFilter;