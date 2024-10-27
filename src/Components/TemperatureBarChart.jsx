// TemperatureBarChart.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const TemperatureBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const lat = 28.5383;
      const lon = -81.3792; // Orlando coordinates

      try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
          params: {
            lat,
            lon,
            key: apiKey,
            units: 'I', // Set units to Fahrenheit
          },
        });

        const data = response.data.data.slice(0, 4); // Get data for the next 4 days
        const formattedData = data.map(day => ({
          date: day.valid_date,
          temperature: day.temp, // This will now be in Fahrenheit
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchTemperatureData();
  }, []);

  return (
    <div className="rounded-lg p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: 'grey' }} />
          <YAxis tick={{ fill: 'grey' }} />
          <Tooltip />
          <Legend 
            verticalAlign="bottom" 
            align='center'
            layout='horizontal'
            wrapperStyle={{ paddingBottom: '20px'}}
          />
          <Bar dataKey="temperature" fill="#a24de5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureBarChart;