import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./WeatherDetails.css";

const WeatherDetails = () => {
  const { date, city, state } = useParams();
  const [hourlyData, setHourlyData] = useState([]);
  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1); // Increment date by 1 day
        const endDate = nextDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD

        const apiUrl = `https://api.weatherbit.io/v2.0/history/hourly?city=${city}&start_date=${date}&end_date=${endDate}&units=I&key=${API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorMessage = await response.text(); // Get detailed error message from response
          throw new Error(
            `Failed to fetch weather data: ${response.status} - ${errorMessage}`
          );
        }

        const data = await response.json();
        setHourlyData(data.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle error state or display a message to the user
      }
    };

    if (city && state && date) {
      fetchData();
    }
  }, [city, state, date]); // API_KEY is not included in the dependency array

  return (
    <div className="Detail-table">
      <h2>Weather Details for {date}</h2>

      {/* Render temperature graph using recharts */}
      <div className="LineChart-container">
        <LineChart width={800} height={400} data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp_local" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default WeatherDetails;
