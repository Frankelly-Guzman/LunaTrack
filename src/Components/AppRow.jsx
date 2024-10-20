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
    // Adding the API response values to the mapping
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
    const APIKEY = import.meta.env.VITE_API_KEY;

    const location = {
      latitude: 28.5383,
      longitude: -81.3792,
    };

    const fetchMoonData = async () => {
      try {
        const response = await axios.get('https://api.ipgeolocation.io/astronomy', {
          params: {
            apiKey: APIKEY,
            lat: location.latitude,
            long: location.longitude,
          },
        });

        const data = response.data;
        setMoonPhase(data.moon_phase);  // Assuming this is returned as a string
        setMoonRise(data.moonrise);      // Access moonrise directly
      } catch (error) {
        console.error('Error fetching moon data:', error);
      }
    };

    fetchMoonData();
  }, []);

  return (
    <>
      <div className='grid grid-cols-3 gap-4 my-4 w-full mr-4 h-full'>
        <Card
          headerText="Orlando"
          subHeaderText="Florida, USA"
        />
        <Card
          headerText={moonRise ? moonRise : 'Loading...'} // Moonrise is a string; no need for Date parsing
          subHeaderText="Moon Rise"
        />
        <Card
          headerText={moonPhase ? `${moonPhaseEmojis[moonPhase]}` : 'Loading...'}
          subHeaderText="Moon Phase"
        />
      </div>
    </>
  );
}

export default AppRow;