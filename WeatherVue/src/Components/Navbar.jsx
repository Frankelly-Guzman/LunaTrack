import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/" className="button">
        <img src="/icons8-home-48.png" alt="" />
        Dashboard
      </Link>
      <Link to="/" className="button">
        {" "}
        {/* Update to "/" */}
        <img src="/icons8-magnifying-glass-48.png" alt="" />
        Search
      </Link>
      <Link to="/about" className="button">
        <img src="/icons8-about-48.png" alt="" />
        About
      </Link>
    </div>
  );
};

export default Navbar;
