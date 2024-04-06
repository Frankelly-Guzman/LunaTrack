import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="SideBar">
      <Header />
      <Navbar />
    </div>
  );
};

export default SideBar;
