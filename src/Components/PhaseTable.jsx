import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhaseFilter from './PhaseFilter'; // Import your PhaseFilter component

const MoonPhaseTable = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    if (moonPhase <= 0.03 || moonPhase >= 0.97) return moonPhaseEmojis['NEW_MOON'];
    if (moonPhase > 0.03 && moonPhase < 0.25) return moonPhaseEmojis['WAXING_CRESCENT'];
    if (moonPhase === 0.25) return moonPhaseEmojis['FIRST_QUARTER'];
    if (moonPhase > 0.25 && moonPhase < 0.5) return moonPhaseEmojis['WAXING_GIBBOUS'];
    if (moonPhase === 0.5) return moonPhaseEmojis['FULL_MOON'];
    if (moonPhase > 0.5 && moonPhase < 0.75) return moonPhaseEmojis['WANING_GIBBOUS'];
    if (moonPhase === 0.75) return moonPhaseEmojis['LAST_QUARTER'];
    if (moonPhase > 0.75 && moonPhase < 0.97) return moonPhaseEmojis['WANING_CRESCENT'];
  };

  // Function to handle the filter submission
  const handleFilterSubmit = () => {
    const newFilteredData = forecastData.filter(day => {
      const matchesPhase = selectedPhase ? getMoonPhaseEmoji(day.moon_phase) === moonPhaseEmojis[selectedPhase] : true;
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

  return (
    <div className='space-y-4 w-full items-center justify-center text-center'>
      {/* Phase Filter */}
      <PhaseFilter 
        selectedPhase={selectedPhase} 
        setSelectedPhase={setSelectedPhase} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        onSubmit={handleFilterSubmit} 
        onReset={handleReset} 
      />
  
      {/* Table */}
      <div className='overflow-auto flex justify-center'>
        <table className='w-3/4 text-white'>
          <thead className='bg-slate-900'>
            <tr>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Time (Sunrise - Sunset)</th>
              <th>Phase</th>
            </tr>
          </thead>
          <tbody className='bg-slate-800'>
            {filteredData.map((day) => (
              <tr key={day.valid_date} className='hover:bg-slate-700'>
                <td>{day.valid_date}</td>
                <td>{day.temp}°C</td>
                <td>{`${formatTime(day.sunrise_ts)} - ${formatTime(day.sunset_ts)}`}</td>
                <td>{getMoonPhaseEmoji(day.moon_phase)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoonPhaseTable;