import { useState } from "react";
import SideBar from "./Components/SideBar";
import WeatherAPI from "./Components/WeatherAPI";
import "./App.css";
import SearchBar from "./Components/SearchBar";

function App() {
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <>
      <div className="App">
        <SideBar />
        <SearchBar />
        <WeatherAPI searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default App;
