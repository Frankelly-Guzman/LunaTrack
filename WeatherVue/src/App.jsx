import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import WeatherForecast from "./Components/WeatherForecast";
import CurrentWeather from "./Components/CurrentWeather";
import WeatherDetails from "./Components/WeatherDetails";
import NotFound from "./Components/NotFound";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState({ city: "", state: "" });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.city || !searchQuery.state) {
        // Don't fetch data if city or state is not provided
        return;
      }

      try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${searchQuery.city}&state=${searchQuery.state}&units=I&key=${API_KEY}`
        );
        if (!currentWeatherResponse.ok) {
          throw new Error("Failed to fetch current weather data");
        }
        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);

        // Fetch daily forecast
        const dailyForecastResponse = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery.city}&state=${searchQuery.state}&units=I&key=${API_KEY}`
        );
        if (!dailyForecastResponse.ok) {
          throw new Error("Failed to fetch daily forecast data");
        }
        const dailyForecastData = await dailyForecastResponse.json();
        setDailyForecast(dailyForecastData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [searchQuery]); // Trigger effect when searchQuery changes

  const handleSearch = (city, state) => {
    setSearchQuery({ city, state });
  };

  const handlePaperclipClick = (date, city, state) => {
    navigate(`/weather-details`, { state: { date, city, state } });
  };

  return (
    <div className="main-container">
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}
      <CurrentWeather weatherData={currentWeather} />
      <Routes>
        <Route
          path="*"
          element={
            <WeatherForecast
              forecastData={dailyForecast}
              city={searchQuery.city} // Pass city prop to WeatherForecast
              state={searchQuery.state} // Pass state prop to WeatherForecast
              onPaperclipClick={handlePaperclipClick}
            />
          }
        />
        <Route
          path="/weather-details/:date"
          element={<WeatherDetails API_KEY={API_KEY} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
