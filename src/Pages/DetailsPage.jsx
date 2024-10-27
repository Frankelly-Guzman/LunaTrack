import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const DetailsPage = () => {
  const { date } = useParams();
  const [details, setDetails] = useState(null);

  const APIKEY = import.meta.env.VITE_API_KEY;

  const location = {
    latitude: 28.5383,
    longitude: -81.3792,
  };

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

  const { emoji, name } = details ? getMoonPhaseEmoji(details.moon_phase_lunation) : { emoji: '', name: '' };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            days: 7,
            key: APIKEY,
          },
        });

        const data = response.data.data;
        const selectedDayDetails = data.find(day => day.valid_date === date);

        if (selectedDayDetails) {
          setDetails(selectedDayDetails);
        } else {
          console.error('No details found for the selected date');
        }
      } catch (error) {
        console.error('Error fetching moon data:', error);
      }
    };

    fetchDetails();
  }, [date, APIKEY, location.latitude, location.longitude]);

  // Convert UTC timestamp to Eastern Time (ET)
  const formatTimeToET = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' });
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} 
    className="flex items-center justify-center h-screen w-screen text-white">
      <div className="bg-slate-800/70 p-6 rounded-lg shadow-lg w-3/4 max-w-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Date: {date}</h2>
        {details ? (
          <div className="space-y-3">
            <p><span className="font-semibold">Phase:</span> {details.moon_phase !== undefined ? `${emoji}  ${name}` : 'N/A'}</p>
            <p><span className="font-semibold">Moonrise:</span> {details.moonrise_ts ? formatTimeToET(details.moonrise_ts) : 'N/A'}</p>
            <p><span className="font-semibold">Moonset:</span> {details.moonset_ts ? formatTimeToET(details.moonset_ts) : 'N/A'}</p>
            <p><span className='font-semibold'>Description:</span> {details.weather.description}</p>
            {/* Add more details as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </motion.div>
  );
};

export default DetailsPage;