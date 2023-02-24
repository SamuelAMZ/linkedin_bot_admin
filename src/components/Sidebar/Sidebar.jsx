import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// component
// import Auth from "../Auth/Auth";

// icons
import { AiOutlineHome, AiTwotoneSetting } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

const Sidebar = () => {
  // loaction
  const location = useLocation();

  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.includes("/404") ||
      location.pathname.includes("/register") ||
      location.pathname === "/forgot-password"
    ) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* <Auth /> */}
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/home"}>
                {/* logo */}
                {/* <img src="/img/logo.png" alt="" /> */}
                <h1>Admin</h1>
              </Link>
            </div>

            {/* menu elements */}
            <ul className="menu-container">
              <Link to={"/linkedin"}>
                <li
                  className={
                    location.pathname === "/linkedin" ? "active-menu" : ""
                  }
                >
                  <div className="icon-wrap">
                    <FaLinkedinIn />
                  </div>
                  <p>Linkedin</p>
                </li>
              </Link>
              <Link to={"/indeed"}>
                <li
                  className={
                    location.pathname === "/indeed" ? "active-menu" : ""
                  }
                >
                  <div className="icon-wrap">
                    <SiIndeed />
                  </div>
                  <p>Indeed</p>
                </li>
              </Link>

              {/* separator */}
              <span className="seperator-element"></span>

              <Link to={"/settings"}>
                <li
                  className={
                    location.pathname.includes("/settings") ? "active-menu" : ""
                  }
                >
                  <div className="icon-wrap">
                    <AiTwotoneSetting />
                  </div>
                  <p>Settings</p>
                </li>
              </Link>

              {/* logout */}
              <Link to={"/logout"} className="logout">
                <li>
                  <FiExternalLink />
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
