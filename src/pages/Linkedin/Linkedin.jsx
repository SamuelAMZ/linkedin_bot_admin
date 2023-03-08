import React from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

import JobList from "./JobList/JobList";

const Linkedin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header page={"All Linkedin Searches"} />

      <div className="searches-container centerer">
        {/* memu */}
        {
          <div className="tabs menu-tab-parent">
            <Link to={"/linkedin"}>
              <a
                className={
                  location.pathname === "/linkedin"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered "
                }
              >
                Job Searches
              </a>
            </Link>
            <Link to={"/linkedin/referrals"}>
              <a
                className={
                  location.pathname === "/linkedin/referrals"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered "
                }
              >
                Referral Searches
              </a>
            </Link>
          </div>
        }
        {location.pathname === "/linkedin" && <JobList />}

        {/* outlet */}
        {location.pathname !== "/linkedin" && <Outlet />}
      </div>
    </>
  );
};

export default Linkedin;
