import React, { useContext, useEffect } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";

// contexts
import UserContext from "../../contexts/UserContext";

// icons
import { FiLinkedin } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";
import { BiTime } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

// icons
import { AiOutlineHome, AiOutlineUser, AiFillPlusCircle } from "react-icons/ai";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiProfileLine } from "react-icons/ri";

const Account = () => {
  const location = useLocation();
  const { login, changeLogin } = useContext(UserContext);

  useEffect(() => {
    console.log(login);
  }, []);

  return (
    <>
      <Auth />
      <Header page={"Account"} />
      <div className="centerer account-container">
        {/* memu */}
        {/* <div className="tabs menu-tab-parent">
          <Link to={"/account"}>
            <a
              className={
                location.pathname === "/account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Your account
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
              Create new Account
            </a>
          </Link>
        </div> */}

        {/* your account  */}
        {location.pathname === "/account" && (
          <div className="account">
            <div className="quick-links stats-container-jd account-quick-links">
              <Link to="/account-details">
                <div className="stat-jd">
                  <div>
                    <p>Account details</p>
                    <p className="desc">update your account details</p>
                  </div>
                  <RiProfileLine />
                </div>
              </Link>
              <Link to="#">
                <div className="stat-jd">
                  <div>
                    <p>Reset Password</p>
                    <p className="desc">Change your password</p>
                  </div>
                  <AiOutlineSetting />
                </div>
              </Link>
              <Link to="/logout">
                <div className="stat-jd">
                  <div>
                    <p>Logout</p>
                    <p className="desc">Logout from your current session</p>
                  </div>
                  <HiOutlineLogout />
                </div>
              </Link>
              <Link to="/settings">
                <div className="stat-jd">
                  <div>
                    <p>Accounts</p>
                    <p className="desc">Add a new job account</p>
                  </div>
                  <AiOutlineUser />
                </div>
              </Link>
              <Link to="/settings/profiles">
                <div className="stat-jd">
                  <div>
                    <p>Profiles</p>
                    <p className="desc">
                      Add new profile for your job applying
                    </p>
                  </div>
                  <CgProfile />
                </div>
              </Link>
              <Link to="/schedules">
                <div className="stat-jd">
                  <div>
                    <p>Schedules</p>
                    <p className="desc">Visit and manage your schedules</p>
                  </div>
                  <BiTime />
                </div>
              </Link>
              <Link to="/settings">
                <div className="stat-jd">
                  <div>
                    <p>Settings</p>
                    <p className="desc">Visit and manage your settings</p>
                  </div>
                  <AiOutlineSetting />
                </div>
              </Link>
              <Link to="/analytics">
                <div className="stat-jd">
                  <div>
                    <p>Analytics</p>
                    <p className="desc">Visit and manage your analytics</p>
                  </div>
                  <TbBrandGoogleAnalytics />
                </div>
              </Link>
              <Link to="/linkedin">
                <div className="stat-jd">
                  <div>
                    <p>Linkedin</p>
                    <p className="desc">
                      Visit and manage your Linkedin searches
                    </p>
                  </div>
                  <FiLinkedin />
                </div>
              </Link>
              <Link to="/indeed">
                <div className="stat-jd">
                  <div>
                    <p>Indeed</p>
                    <p className="desc">
                      Visit and manage your Indeed searches
                    </p>
                  </div>
                  <SiIndeed />
                </div>
              </Link>
            </div>

            <div className="account-details">
              {login && (
                <ul>
                  <li>
                    <span>Name:</span> {login.user.name}
                  </li>
                  <li>
                    <span>Email:</span> {login.user.email}
                  </li>
                  <li>
                    <span>Role:</span> admin
                  </li>
                  <li>
                    <span>Registration Date:</span>{" "}
                    {login.user.date.split("T")[0]}
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* outlet */}
        {/* {location.pathname !== "/account" && <Outlet />} */}
      </div>
    </>
  );
};

export default Account;
