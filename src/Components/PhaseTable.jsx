import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhaseFilter from './PhaseFilter'; // Import your PhaseFilter component
import { useNavigate } from 'react-router-dom';
import MoonPhaseChart from './MoonPhaseChart';
import TemperatureBarChart from './TemperatureBarChart';

const MoonPhaseTable = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const moonPhaseEmojis = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘',
    // Weatherbit API specific values
    'WANING_GIBBOUS': '🌖',
    'WAXING_GIBBOUS': '🌔',
    'NEW_MOON': '🌑',
    'FIRST_QUARTER': '🌓',
    'FULL_MOON': '🌕',
    'LAST_QUARTER': '🌗',
    'WAXING_CRESCENT': '🌒',
    'WANING_CRESCENT': '🌘',
  };

  useEffect(() => {
    const fetchMoonPhases = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const lat = 28.5383;
      const lon = -81.3792; // Orlando coordinates

      try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
          params: {
            lat,
            lon,
            key: apiKey,
            units: 'I',
          },
        });
        setForecastData(response.data.data);
        setFilteredData(response.data.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching moon phase data:', error);
      }
    };

    fetchMoonPhases();
  }, []);

  // Function to convert Unix timestamp to a readable time format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to get the correct emoji based on moon phase from API response
  const getMoonPhaseEmoji = (moonPhase) => {
    if (moonPhase <= 0.03 || moonPhase >= 0.97) return { emoji: '🌑', name: 'New Moon' };
    if (moonPhase > 0.03 && moonPhase < 0.25) return { emoji: '🌒', name: 'Waxing Crescent' };
    if (moonPhase === 0.25) return { emoji: '🌓', name: 'First Quarter' };
    if (moonPhase > 0.25 && moonPhase < 0.5) return { emoji: '🌔', name: 'Waxing Gibbous' };
    if (moonPhase === 0.5) return { emoji: '🌕', name: 'Full Moon' };
    if (moonPhase > 0.5 && moonPhase < 0.75) return { emoji: '🌖', name: 'Waning Gibbous' };
    if (moonPhase === 0.75) return { emoji: '🌗', name: 'Last Quarter' };
    if (moonPhase > 0.75 && moonPhase < 0.97) return { emoji: '🌘', name: 'Waning Crescent' };
    return { emoji: '❓', name: 'Unknown' }; // Fallback in case of unexpected values
  };

  // Function to handle the filter submission
const handleFilterSubmit = () => {
  const newFilteredData = forecastData.filter(day => {
    const moonPhase = getMoonPhaseEmoji(day.moon_phase);
    const matchesPhase = selectedPhase ? moonPhase.name === selectedPhase : true;
    const matchesDate = selectedDate ? day.valid_date === selectedDate : true;
    return matchesPhase && matchesDate;
  });
  setFilteredData(newFilteredData);
};

  // Function to reset the filter
  const handleReset = () => {
    setSelectedPhase('');
    setSelectedDate('');
    setFilteredData(forecastData); // Reset to the full dataset
  };

  const handleDetailsClick = (date) => {
    navigate(`/details/${date}`);
  }

  return (
    <div className='flex w-full space-x-4'>
      {/* Left Side: Filter and Table */}
      <div className='flex flex-col w-2/3'>
        {/* Phase Filter */}
        <div className='flex mb-4'>
          <PhaseFilter 
            selectedPhase={selectedPhase} 
            setSelectedPhase={setSelectedPhase} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate}
            onSubmit={handleFilterSubmit} 
            onReset={handleReset} 
          />
        </div>
        
        {/* Table */}
        <div className='overflow-auto max-h-[500px] rounded-lg'>
          <table className='w-full text-white'>
            <thead className='bg-slate-900'>
              <tr>
                <th>Date</th>
                <th>Temperature (°F)</th>
                <th>Time (Sunrise - Sunset)</th>
                <th>Phase</th>
                <td>Details</td>
              </tr>
            </thead>
            <tbody className='bg-slate-800'>
              {filteredData.map((day) => {
                const moonPhase = getMoonPhaseEmoji(day.moon_phase);
                return (
                  <tr key={day.valid_date} className='hover:bg-slate-700'>
                    <td>{day.valid_date}</td>
                    <td>{day.temp}°F</td>
                    <td>{`${formatTime(day.sunrise_ts)} - ${formatTime(day.sunset_ts)}`}</td>
                    <td>{moonPhase.emoji} {moonPhase.name}</td>
                    <td>
                      <button onClick={() => handleDetailsClick(day.valid_date)}>
                        🔗
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Right Side: Chart and Temperature Bar Chart */}
      <div className='w-1/3 mr-4'>
        <MoonPhaseChart />
        <TemperatureBarChart /> {/* Include the Temperature Bar Chart here */}
      </div>
    </div>
  );
};

export default MoonPhaseTable;