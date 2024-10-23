import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const AppRow = () => {
  const [moonPhase, setMoonPhase] = useState(null);
  const [moonRise, setMoonRise] = useState(null);

  const moonPhaseEmojis = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘',
    // Additional API response values
    'WANING_GIBBOUS': '🌖',
    'WAXING_GIBBOUS': '🌔',
    'NEW_MOON': '🌑',
    'FIRST_QUARTER': '🌓',
    'FULL_MOON': '🌕',
    'LAST_QUARTER': '🌗',
    'WAXING_CRESCENT': '🌒',
    'WANING_CRESCENT': '🌘',
  };

  // Function to convert Unix timestamp to a readable time format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const APIKEY = import.meta.env.VITE_API_KEY;

    const location = {
      latitude: 28.5383,
      longitude: -81.3792,
    };

    const fetchMoonData = async () => {
      try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            days: 1,
            key: APIKEY,
          },
        });

        const data = response.data.data[0]; // Access the first day's forecast data

        setMoonPhase(data.moon_phase_lunation); // Assuming this is a value between 0 and 1
        setMoonRise(data.moonrise_ts); // Timestamp for moonrise
      } catch (error) {
        console.error('Error fetching moon data:', error);
      }
    };

    fetchMoonData();
  }, []);

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

  return (
    <>
      <div className='grid grid-cols-3 gap-4 my-4 w-full mr-4 h-full'>
        <Card
          headerText="Orlando"
          subHeaderText="Florida, USA"
        />
        <Card
          headerText={moonRise ? formatTime(moonRise) : 'Loading...'}
          subHeaderText="Moon Rise"
        />
        <Card
          headerText={moonPhase !== null ? getMoonPhaseEmoji(moonPhase) : 'Loading...'}
          subHeaderText="Moon Phase"
        />
      </div>
    </>
  );
};

export default AppRow;