// WeatherForecast.jsx

import React, { useState } from "react";

const WeatherForecast = ({ forecastData }) => {
  const iconBaseUrl = "https://www.weatherbit.io/static/img/icons/";

  // Define the list of weather conditions and their corresponding keywords
  const weatherConditions = [
    { label: "All", keyword: "" },
    { label: "Cloudy", keyword: "cloud" },
    { label: "Rainy", keyword: "rain" },
    { label: "Clear", keyword: "clear" },
  ];

  // State to hold the selected weather condition
  const [selectedCondition, setSelectedCondition] = useState("");

  // Function to handle filter selection
  const handleFilterChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  // Function to filter weather data based on selected condition
  const filteredData = forecastData
    ? forecastData.data.filter((day) => {
        if (selectedCondition === "") return true; // Show all data if "All" is selected
        return day.weather.description
          .toLowerCase()
          .includes(selectedCondition);
      })
    : [];

  return (
    <div className="weather-forecast">
      <h2>Weather Forecast</h2>
      {forecastData && (
        <div className="forecast-table-container">
          {/* Filter dropdown menu */}
          <div className="filter-container">
            <label htmlFor="filter">Filter by Weather Condition: </label>
            <select
              id="filter"
              value={selectedCondition}
              onChange={handleFilterChange}
            >
              {weatherConditions.map((condition) => (
                <option key={condition.keyword} value={condition.keyword}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>

          {/* Weather forecast table */}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weather</th>
                <th>Temperature (°F)</th>
                <th>Precipitation (in)</th>
                <th>Icon</th>
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((day) => (
                <tr key={day.ts}>
                  <td>{day.valid_date}</td>
                  <td>{day.weather.description}</td>
                  <td>{day.temp}</td>
                  <td>{day.precip}</td>
                  <td>
                    <img
                      src={`${iconBaseUrl}${day.weather.icon}.png`}
                      alt={day.weather.description}
                    />
                  </td>
                  {/* Add more table cells for additional weather data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
