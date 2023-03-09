import React from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// auths
import Auth from "./components/Auth/Auth";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Login from "./pages/Login/Login";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import NewSearch from "./pages/NewSearch/NewSearch";
import Linkedin from "./pages/Linkedin/Linkedin";
import Indeed from "./pages/Indeed/Indeed";
import Settings from "./pages/Settings/Settings";
import Analytics from "./pages/Analitycs/Analitycs";
import Logout from "./pages/Logout/Logout";
import Account from "./pages/Account/Account";
import Schedules from "./pages/Schedules/Schedules";
import AccountDetails from "./pages/AccountDetails/AccountDetails";

// subpages
import SingleSearch from "./pages/SingleSearch/SingleSearch";
import CreateNewAccount from "./pages/Account/CreateNew/CreateNewAccount";
import Profiles from "./pages/Settings/Profiles/Profiles";
import NewProfile from "./pages/Settings/Profiles/NewProfile/NewProfile";
import SingleProfile from "./pages/Settings/Profiles/SingleProfile/SingleProfile";
import JobSearch from "./pages/NewSearch/JobSearch/JobSearch";
import ReferralSearch from "./pages/NewSearch/ReferralSearch/ReferralSearch";
import ReferralList from "./pages/Linkedin/ReferralList/ReferralList";

// contexts
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* auth */}
          {/* <Auth /> */}

          {/* component code */}
          <div className="site-container">
            <div className="notif"></div>

            <UserProvider>
              {/* sidebar */}
              <Sidebar />

              {/* main */}
              <div className="main">
                <Routes>
                  {/* auth pages */}
                  <Route path="/" exact element={<Login />} />

                  {/* dashboad pages */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/new" element={<NewSearch />}>
                    <Route path="/new/job" element={<JobSearch />} />
                    <Route path="/new/referral" element={<ReferralSearch />} />
                  </Route>
                  <Route path="/linkedin" element={<Linkedin />}>
                    <Route
                      path="/linkedin/referrals"
                      element={<ReferralList />}
                    />
                  </Route>
                  <Route path="/indeed" element={<Indeed />} />
                  <Route path="/schedules" element={<Schedules />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />}>
                    <Route path="/settings/profiles" element={<Profiles />} />
                    <Route
                      path="/settings/profiles/new"
                      element={<NewProfile />}
                    />
                    <Route
                      path="/settings/profiles/profile/:profileid"
                      element={<SingleProfile />}
                    />
                  </Route>
                  <Route path="/account" element={<Account />}>
                    <Route
                      path="/account/new-account"
                      element={<CreateNewAccount />}
                    />
                  </Route>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/account-details" element={<AccountDetails />} />

                  {/* single search page */}
                  <Route path="/search/:searchid" element={<SingleSearch />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </UserProvider>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
