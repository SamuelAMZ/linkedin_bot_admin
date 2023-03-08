import React from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

// icons
import { IoIosArrowBack } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.pathname === "/new" && (
        <>
          <Header page={"New search"} />

          <div className="centerer">
            <>
              {/* back */}
              <label className="back-btn" onClick={() => navigate(-1)}>
                <IoIosArrowBack /> Back
              </label>

              <div className="select-search-type">
                <Link to="/new/job">
                  <div className="icon">
                    <BsBag />
                  </div>
                  <p>New Jobs search</p>
                </Link>
                <Link to="/new/referral">
                  <div className="icon">
                    <FiUsers />
                  </div>
                  <p>New Referrals search</p>
                </Link>
              </div>
            </>
          </div>
        </>
      )}

      {/* outlet */}
      {location.pathname !== "/new" && <Outlet />}
    </>
  );
};

export default Settings;
