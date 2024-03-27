// WeatherList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherList = ({ city, state }) => {
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY; // Replace with your Weatherbit API key

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state}&key=${API_KEY}`
        );
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching forecast data: ", error);
      }
    };

    fetchForecastData();
  }, [city, state]);

  return (
    <div className="weather-list">
      <h2>16-Day Weather Forecast</h2>
      {forecastData && (
        <ul>
          {forecastData.data.map((day) => (
            <li key={day.ts}>
              <div>Date: {day.valid_date}</div>
              <div>Weather: {day.weather.description}</div>
              <div>Temperature: {day.temp} °C</div>
              <div>Precipitation: {day.precip}</div>
              {/* Add more weather data fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeatherList;
