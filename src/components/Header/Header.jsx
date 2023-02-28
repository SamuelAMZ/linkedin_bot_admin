import React from "react";
import { Link } from "react-router-dom";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";

const Header = ({ page }) => {
  return (
    <div className="header-container">
      <div className="header-elm">
        <div className="page-title">
          <h2>{page}</h2>
        </div>
        {/* new btn */}
        <div className="right-side">
          <a href="/new">
            <button className="btn btn-primary">
              {" "}
              <BsPlusLg /> <p>New Search</p>
            </button>
          </a>

          <div className="dropdown dropdown-bottom dropdown-end">
            <label className="user-icon m-1" tabIndex={0}>
              <div className="user-img">
                <img
                  src={require("../../img/default-user.png")}
                  alt="user image"
                />
              </div>

              <MdKeyboardArrowDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/account"}>My Account</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
