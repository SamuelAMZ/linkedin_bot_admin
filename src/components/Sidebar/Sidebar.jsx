import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// component
import Auth from "../Auth/Auth";

// icons
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiFillPlusCircle,
} from "react-icons/ai";
import { FiLinkedin } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { BiTime } from "react-icons/bi";

const Sidebar = () => {
  // loaction
  const location = useLocation();

  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/404")) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Auth />
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/home"}>
                <h1>Admin</h1>
              </Link>
            </div>

            {/* menu elements */}
            <ul className="menu-container">
              {/* login user box */}
              <Link to={"/account"}>
                <li className="user-box">
                  <div className="user-img">
                    <img
                      src={require("../../img/default-user.png")}
                      alt="user image"
                    />
                  </div>
                  <div className="user-details">
                    <h3>John Doe</h3>
                    <p>Admin user</p>
                  </div>
                </li>
              </Link>
              {/* separator
              <span className="seperator-element"></span> */}
              <Link to={"/home"}>
                <li
                  className={location.pathname === "/home" ? "active-menu" : ""}
                >
                  <AiOutlineHome />
                  <p>Dashboard</p>
                </li>
              </Link>
              <Link to={"/linkedin"}>
                <li
                  className={
                    location.pathname === "/linkedin" ? "active-menu" : ""
                  }
                >
                  <FiLinkedin />
                  <p>Linkedin</p>
                </li>
              </Link>
              <Link to={"/indeed"}>
                <li
                  className={
                    location.pathname === "/indeed" ? "active-menu" : ""
                  }
                >
                  <SiIndeed />
                  <p>Indeed</p>
                </li>
              </Link>
              <Link to={"/schedules"}>
                <li
                  className={
                    location.pathname === "/schedules" ? "active-menu" : ""
                  }
                >
                  <BiTime />
                  <p>Schedules</p>
                </li>
              </Link>
              <Link to={"/analytics"}>
                <li
                  className={
                    location.pathname === "/analytics" ? "active-menu" : ""
                  }
                >
                  <TbBrandGoogleAnalytics />
                  <p>Analytics</p>
                </li>
              </Link>
              <Link to={"/settings"}>
                <li
                  className={
                    location.pathname.includes("/settings") ? "active-menu" : ""
                  }
                >
                  <AiOutlineSetting />
                  <p>Settings</p>
                </li>
              </Link>
              <Link to={"/account"}>
                <li
                  className={
                    location.pathname.includes("/account") ? "active-menu" : ""
                  }
                >
                  <AiOutlineUser />
                  <p>My Account</p>
                </li>
              </Link>
              {/* new search btn */}
              <Link to={"/new"} className="new-sidebar">
                <li>
                  <AiFillPlusCircle />
                  <p>New Search</p>
                </li>
              </Link>
              {/* logout */}
              <Link to={"/logout"}>
                <li>
                  <HiOutlineLogout />
                  <p>Logout</p>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
