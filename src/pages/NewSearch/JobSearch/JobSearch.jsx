import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// contexts
import UserContext from "../../../contexts/UserContext";

// components
import Header from "../../../components/Header/Header";

// icons
import { IoIosArrowBack } from "react-icons/io";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../../helpers/postReq";
import notif from "../../../helpers/notif";

const JobSearch = () => {
  // user session
  const { login, changeLogin } = useContext(UserContext);
  const navigate = useNavigate();

  // states
  const [switchToLinkedinUrlMode, setSwitchToLinkedinUrlMode] = useState(false);
  const [searchData, setSearchData] = useState({
    keyword: "",
    country: "",
    platform: "linkedin",
    onSite: "",
    jobType: "",
    salary: "",
    underTen: false,
    linkedinFilterUri: "",
    accountId: "",
    profileId: "",
  });

  // switch to linkedin filter uri mode
  const linkedinUrlMode = (e) => {
    setSwitchToLinkedinUrlMode(e.target.checked);
  };

  // pull accounts
  const getAllAccounts = async (e) => {
    // send req
    return await postReq({ uid: login?.user?.id }, "/api/all-app-accounts");
  };
  const {
    data: allAccountsData,
    isLoading: allAccountsLoading,
    isError: allError,
    refetch: allRefetch,
  } = useQuery(["getallaccounts", login], getAllAccounts, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // pull profiles
  const getAllProfiles = async (e) => {
    // send req
    return await postReq(
      { uid: login?.user?.id, accountLinked: searchData.accountId },
      "/api/all-app-profiles"
    );
  };
  const {
    data: allProfilesData,
    isLoading: allProfilesLoading,
    isError: allProfilesError,
    refetch: allProfilesRefetch,
  } = useQuery(
    ["getallprofiles", login, searchData.accountId],
    getAllProfiles,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  // handle new search
  const [newSearchLoading, setNewSearchLoading] = useState(false);
  const handleNewSearch = async (e) => {
    e.preventDefault();

    // sending request
    try {
      // loading
      setNewSearchLoading(true);

      // data
      const dataToSend = { ...searchData, uid: login?.user?.id };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/new");

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);

        return setNewSearchLoading(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        setNewSearchLoading(false);

        // redirect to the single search page
        return navigate(`/search/${serverMessage.payload.searchId}`);
      }
    } catch (err) {
      console.log(err);
      notif("something wrong, please retry later");
    }
  };

  return (
    <>
      <Header page={"New Job Search"} />

      {/* new search */}
      <div className="centerer newsearch-container">
        <label className="back-btn" onClick={() => navigate(-1)}>
          <IoIosArrowBack /> Back
        </label>

        <div className="form-page new-profile">
          <h1>Start a new jobs search</h1>
          <div className="switcher-mode">
            <label htmlFor="switcher">Use our integration form</label>
            <input
              id="switcher"
              type="checkbox"
              className="toggle toggle-primary"
              onClick={linkedinUrlMode}
            />
            <label htmlFor="switcher">Use linkedin job search string</label>
          </div>

          {/* form */}
          {!switchToLinkedinUrlMode && (
            <form onSubmit={handleNewSearch}>
              <div className="big-group">
                <div className="form-group">
                  <label htmlFor="keyword">Keyword</label>
                  <input
                    id="keyword"
                    type="text"
                    placeholder="Product Manager"
                    className="input input-bordered w-full"
                    value={searchData.keyword}
                    onChange={(e) =>
                      setSearchData({ ...searchData, keyword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="platform">Platform To Target</label>
                  <select
                    id="platform"
                    className="select select-bordered w-full"
                    value={searchData.platform}
                    onChange={(e) =>
                      setSearchData({ ...searchData, platform: e.target.value })
                    }
                  >
                    <option value="linkedin">Linkedin</option>
                    <option value="indeed">Indeed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="United States"
                    className="input input-bordered w-full"
                    value={searchData.country}
                    onChange={(e) =>
                      setSearchData({ ...searchData, country: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="onsite">On site/Remote/Hybrid</label>
                  <select
                    id="platform"
                    className="select select-bordered w-full"
                    value={searchData.onSite}
                    onChange={(e) =>
                      setSearchData({ ...searchData, onSite: e.target.value })
                    }
                  >
                    <option value="onsite">On site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Job type</label>
                  <select
                    id="type"
                    className="select select-bordered w-full"
                    value={searchData.jobType}
                    onChange={(e) =>
                      setSearchData({ ...searchData, jobType: e.target.value })
                    }
                  >
                    <option value="fulltime">Full time</option>
                    <option value="parttime">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="temtorary">Temporary</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="internship">Internship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <select
                    id="type"
                    className="select select-bordered w-full"
                    value={searchData.salary}
                    onChange={(e) =>
                      setSearchData({ ...searchData, salary: e.target.value })
                    }
                  >
                    <option value="40k+">40k+</option>
                    <option value="60k+">60k+</option>
                    <option value="80k+">80k+</option>
                    <option value="100k+">100k+</option>
                    <option value="120k+">120k+</option>
                    <option value="140k+">140k+</option>
                    <option value="160k+">160k+</option>
                    <option value="180k+">180k+</option>
                    <option value="200k+">200k+</option>
                  </select>
                </div>

                <div className="form-group">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Under 10 applicants</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        value={searchData.underTen}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            underTen: e.target.checked,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Choose an account</label>
                  <select
                    id="type"
                    className="select select-bordered w-full"
                    value={searchData.accountId}
                    onChange={(e) => {
                      setSearchData({
                        ...searchData,
                        accountId: e.target.value,
                      });
                    }}
                  >
                    {allAccountsLoading && <option>Loading accounts...</option>}
                    <option>Choose an account</option>
                    {!allError &&
                      allAccountsData?.payload?.map((item, idx) => {
                        return (
                          <option
                            value={item._id}
                            key={idx}
                          >{`${item.type} - ${item.email}`}</option>
                        );
                      })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Choose a profile</label>
                  <select
                    id="type"
                    className="select select-bordered w-full"
                    value={searchData.profileId}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        profileId: e.target.value,
                      })
                    }
                  >
                    {allProfilesLoading && <option>Loading Profiles...</option>}
                    <option>Choose a profile</option>
                    {!allProfilesError &&
                      allProfilesData?.payload?.map((item, idx) => {
                        return (
                          <option
                            value={item._id}
                            key={idx}
                          >{`${item.title} - ${item._id}`}</option>
                        );
                      })}

                    {/* fallback message */}
                    {!allProfilesError &&
                      allProfilesData?.payload?.length < 1 && (
                        <option>
                          No profile linked to this account, link a profile to
                          continue
                        </option>
                      )}
                  </select>
                </div>

                {newSearchLoading ? (
                  <button className="btn btn-primary w-full loading">
                    Searching...
                  </button>
                ) : (
                  <button className="btn btn-primary w-full">
                    Start Searching
                  </button>
                )}
              </div>
            </form>
          )}

          {/* linkedin url form */}
          {switchToLinkedinUrlMode && (
            <form>
              <div className="big-group">
                <div className="form-group">
                  <label htmlFor="url">Linkedin Search Filters String</label>
                  <input
                    id="url"
                    type="text"
                    placeholder="https://www.linkedin.com/jobs/search/?currentJobId=35005..."
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Choose an account</label>
                  <select id="type" className="select select-bordered w-full">
                    <option>Choose</option>
                    <option>linkedin --- johndoe@gmail...</option>
                    <option>indeed --- louisdoe@gmail...</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Choose a profile</label>
                  <select id="type" className="select select-bordered w-full">
                    <option>Choose</option>
                    <option>id: 46426465 --- softw...</option>
                    <option>id: 6426428 --- produc...</option>
                  </select>
                </div>
                <button className="btn btn-primary w-full">
                  Start Scraping
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default JobSearch;
