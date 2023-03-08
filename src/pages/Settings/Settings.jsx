import React from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";
import Accounts from "./Accounts/Accounts";

// icons
import { IoIosArrowBack } from "react-icons/io";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header page={"Settings"} />

      <div className="centerer">
        {/* memu */}
        {!(
          location.pathname.includes("new") ||
          location.pathname.includes("/profiles/profile")
        ) ? (
          <div className="tabs menu-tab-parent">
            <Link to={"/settings"}>
              <a
                className={
                  location.pathname === "/settings"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered "
                }
              >
                Accounts
              </a>
            </Link>
            <Link to={"/settings/profiles"}>
              <a
                className={
                  location.pathname === "/settings/profiles"
                    ? "tab tab-bordered tab-active"
                    : "tab tab-bordered "
                }
              >
                Profiles
              </a>
            </Link>
          </div>
        ) : (
          <label className="back-btn" onClick={() => navigate(-1)}>
            <IoIosArrowBack /> Back
          </label>
        )}

        {/* accounts  */}
        {location.pathname === "/settings" && <Accounts />}

        {/* outlet */}
        {location.pathname !== "/settings" && <Outlet />}
      </div>
    </>
  );
};

export default Settings;
