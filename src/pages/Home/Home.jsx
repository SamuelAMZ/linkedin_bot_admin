import React, { useContext } from "react";
import { Link } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";
import LineChart from "../../components/LineChart/LineChart";

// contexts
import UserContext from "../../contexts/UserContext";

// icons
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BiMessageSquareDots } from "react-icons/bi";
import { TbBrandTelegram, TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";

import { FiLinkedin } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";
import { BiTime } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const { login, changeLogin } = useContext(UserContext);

  // get analytics
  const handleAnalyticsLoading = async (e) => {
    // send req
    return await postReq({ home: "home" }, "/api/homeAnalytics");
  };

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    isError,
    isSuccess,
  } = useQuery(["analytics"], handleAnalyticsLoading, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // chart
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 4, 10, 12, 22, 5, 30],
        backgroundColor: "#0177fb",
        borderColor: "#0177fb",
        color: "#0177fb",
        lineTension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <>
      <Auth />
      <Header page={"Home"} />
      {/* home */}
      <div className="centerer home-container">
        {/* stats */}
        {analyticsLoading && (
          <div className="loaderAnalytics">
            <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
            </SkeletonTheme>
          </div>
        )}
        {analyticsData && analyticsData.code === "ok" && (
          <div className="stats-container-jd">
            <div className="stat-jd">
              <div>
                <p>Search Performed</p>
                <p className="desc">{analyticsData.payload[0].searchCount}</p>
              </div>
              <FiSearch />
            </div>
            <div className="stat-jd">
              <div>
                <p>Job crawled</p>
                <p className="desc">
                  {analyticsData.payload[0].urlCrawledCount}
                </p>
              </div>
              <HiOutlineDocumentSearch />
            </div>
            <div className="stat-jd">
              <div>
                <p>Application submitted</p>
                <p className="desc">
                  {analyticsData.payload[0].pageVisitedCount}
                </p>
              </div>
              <TbBrandTelegram />
            </div>
            <div className="stat-jd">
              <div>
                <p>Referral contacted</p>
                <p className="desc">
                  {analyticsData.payload[0].emailSentCount}
                </p>
              </div>
              <BiMessageSquareDots />
            </div>
          </div>
        )}

        {/* charts */}
        <div className="home-charts">
          {/* chart1 */}
          <div className="chart-container application-sub">
            <div className="chart-head">
              <h4>Application Submitted</h4>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label className="switcher-chart" tabIndex={0}>
                  Week
                  <MdKeyboardArrowDown />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Week</a>{" "}
                  </li>
                  <li>
                    <a>Last 24 hours</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <LineChart data={chartData} />
          </div>
          {/* chart2 */}
          <div className="chart-container application-sub">
            <div className="chart-head">
              <h4>Referral Contacted</h4>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label className="switcher-chart" tabIndex={0}>
                  Week
                  <MdKeyboardArrowDown />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Week</a>{" "}
                  </li>
                  <li>
                    <a>Last 24 hours</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <LineChart data={chartData} />
          </div>
        </div>

        {/* quick links */}
        <h3 className="quick-link-title">Quick Links</h3>
        <div className="quick-links stats-container-jd">
          <Link to="/linkedin">
            <div className="stat-jd">
              <div>
                <p>Linkedin</p>
                <p className="desc">Visit and manage your Linkedin searches</p>
              </div>
              <FiLinkedin />
            </div>
          </Link>
          <Link to="/indeed">
            <div className="stat-jd">
              <div>
                <p>Indeed</p>
                <p className="desc">Visit and manage your Indeed searches</p>
              </div>
              <SiIndeed />
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
                <p className="desc">Add new profile for your job applying</p>
              </div>
              <CgProfile />
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
          <Link to="/new">
            <div className="stat-jd">
              <div>
                <p>New search</p>
                <p className="desc">Start a new search</p>
              </div>
              <BsPlusLg />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
