import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="About">
      <h1>About WeatherVue</h1>
      <p>
        WeatherVue is a weather forecasting application developed by Frankelly
        Guzman for the CodePath React Web-Dev course. It leverages the
        Weatherbit API to provide real-time weather data and forecasts.
      </p>
      <p>
        The application includes features such as displaying current weather
        conditions, weather forecasts for multiple days, and data visualizations
        to help users understand weather trends.
      </p>
      <p>
        WeatherVue aims to provide a user-friendly and informative experience
        for users to stay updated with accurate weather information.
      </p>
    </div>
  );
};

export default About;
