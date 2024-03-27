// WeatherAPI.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import WeatherList from "./WeatherList";

const WeatherAPI = ({ searchQuery }) => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY; // Replace with your Weatherbit API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchQuery) return; // If no search query, exit early
      const { city, state } = searchQuery;
      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state}&key=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  return (
    <div>
      {/* Render CurrentWeather component */}
      <CurrentWeather weatherData={weatherData} />
      {/* Render WeatherList component */}
      <WeatherList forecastData={weatherData} />
    </div>
  );
};

export default WeatherAPI;
