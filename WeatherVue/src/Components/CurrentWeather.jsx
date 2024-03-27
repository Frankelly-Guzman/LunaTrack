// CurrentWeather.jsx
import React from "react";

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { city_name, country_code, weather, temp } = weatherData.data[0];

  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      <div>
        <strong>Location:</strong> {city_name}, {country_code}
      </div>
      <div>
        <strong>Temperature:</strong> {temp}°C
      </div>
      <div>
        <strong>Weather:</strong> {weather.description}
      </div>
      {/* You can add more weather details here if needed */}
    </div>
  );
};

export default CurrentWeather;
