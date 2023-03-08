import React from "react";
import { Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

const Analytics = () => {
  const location = useLocation();

  return (
    <>
      <Header page={"Analytics"} />

      <h1 className="centerer">
        {/* memu */}
        <div className="tabs menu-tab-parent">
          <Link to={"/account"}>
            <a
              className={
                location.pathname === "/account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Summary
            </a>
          </Link>
          <Link to={"/account/new-account"}>
            <a
              className={
                location.pathname === "/account/new-account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Linkedin
            </a>
          </Link>
          <Link to={"/account/new-account"}>
            <a
              className={
                location.pathname === "/account/new-account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Indeed
            </a>
          </Link>
        </div>
      </h1>
    </>
  );
};

export default Analytics;
