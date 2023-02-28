import React from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

const Settings = () => {
  const location = useLocation();

  return (
    <>
      <Header page={"Settings"} />

      <h1 className="centerer">
        <h1>Settings</h1>
      </h1>
    </>
  );
};

export default Settings;
