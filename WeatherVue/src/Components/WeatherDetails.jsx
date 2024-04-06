import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const WeatherDetails = ({ API_KEY, city, state, date }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/history/hourly?city=${city},${state}&start_date=${date}&end_date=${date}&units=I&key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setHourlyData(data.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [API_KEY, city, state, date]);

  return (
    <div>
      <h2>Weather Details for {date}</h2>

      {/* Render temperature graph using recharts */}
      <LineChart width={800} height={400} data={hourlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp_local" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default WeatherDetails;
