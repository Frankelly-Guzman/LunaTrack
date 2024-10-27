import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MoonPhaseChart = () => {
  const [chartData, setChartData] = useState([]);

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

        // Prepare data for the next 4 days (10/27, 10/31, etc.)
        const now = new Date();
        const nextFourDays = Array.from({ length: 4 }, (_, i) => {
          const futureDate = new Date(now);
          futureDate.setDate(now.getDate() + i * 4); // Set to 0, 4, 8, 12 days later
          return futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        });

        const moonPhaseData = response.data.data.filter(day => 
          nextFourDays.includes(day.valid_date)
        ).map(day => ({
          date: day.valid_date,
          phase: day.moon_phase,
        }));

        setChartData(moonPhaseData);
      } catch (error) {
        console.error('Error fetching moon phase data:', error);
      }
    };

    fetchMoonPhases();
  }, []);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{dy: 10}}/>
          <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
          <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
          <Legend 
            verticalAlign="bottom" 
            align='center'
            layout='horizontal'
            wrapperStyle={{ paddingBottom: '20px'}}
            />
          <Line type="monotone" dataKey="phase" stroke="rgba(75, 192, 192, 0.6)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoonPhaseChart;