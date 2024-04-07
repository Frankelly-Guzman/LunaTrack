import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import NotFound from "./Components/NotFound.jsx";
import About from "./Components/About.jsx";
import SideBar from "./Components/SideBar.jsx";
import WeatherDetails from "./Components/WeatherDetails.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <SideBar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/weather-details/:date/:city/:state" // Updated path with city and state params
              element={
                <WeatherDetails
                // ... (props passed to WeatherDetails)
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);
