import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../../components/Header/Header";

// icons
import { IoIosArrowBack } from "react-icons/io";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../../helpers/postReq";

const ReferralSearch = () => {
  const [switchToLinkedinUrlMode, setSwitchToLinkedinUrlMode] = useState(false);
  const [searchData, setSearchData] = useState({
    keyword: "",
    country: "",
    platform: "linkedin",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChanges = (e, type) => {
    if (type === "keyword") {
      setSearchData({
        keyword: e.target.value,
        country: searchData.country,
        platform: searchData.platform,
        email: searchData.email,
        password: searchData.password,
      });
    }

    if (type === "country") {
      setSearchData({
        keyword: searchData.keyword,
        country: e.target.value,
        platform: searchData.platform,
        email: searchData.email,
        password: searchData.password,
      });
    }

    if (type === "platform") {
      setSearchData({
        keyword: searchData.keyword,
        country: searchData.country,
        platform: e.target.value,
        email: searchData.email,
        password: searchData.password,
      });
    }

    if (type === "email") {
      setSearchData({
        keyword: searchData.keyword,
        country: searchData.country,
        platform: searchData.platform,
        email: e.target.value,
        password: searchData.password,
      });
    }

    if (type === "password") {
      setSearchData({
        keyword: searchData.keyword,
        country: searchData.country,
        platform: searchData.platform,
        email: searchData.email,
        password: e.target.value,
      });
    }
  };

  const handleSubmitions = async () => {
    const inputData = { ...searchData };

    // send req
    return await postReq(inputData, "/api/new");
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: sendPost,
  } = useQuery(["new", searchData], handleSubmitions, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleNewSearch = (e) => {
    e.preventDefault();

    // send req
    sendPost();
  };

  // move to single search page
  useEffect(() => {
    if (data && data.code === "ok") {
      navigate(`/search/${data.data.searchId}`);
    }
  }, [data]);

  // //// grab details from url
  // useEffect(() => {
  //   const urlData = location.search.replace("?", "").split("&");

  //   const dataFromUrl = {
  //     keyword: "",
  //     country: "",
  //     platform: "",
  //     email: "",
  //     password: "",
  //   };
  //   urlData.forEach((elm) => {
  //     const temp = elm.split("=");
  //     if (temp[0] === "keyword") {
  //       dataFromUrl.keyword = decodeURI(temp[1]);
  //     }
  //     if (temp[0] === "num") {
  //       dataFromUrl.numberOfPages = temp[1];
  //     }
  //     if (temp[0] === "urls") {
  //       dataFromUrl.urls = temp[1];
  //     }
  //     if (temp[0] === "doms") {
  //       dataFromUrl.domains = temp[1];
  //     }
  //   });
  //   // setting data
  //   setSearchData(dataFromUrl);
  // }, []);

  const linkedinUrlMode = (e) => {
    setSwitchToLinkedinUrlMode(e.target.checked);
  };

  return (
    <>
      <Header page={"New Referral Search"} />

      {/* new search */}
      <div className="centerer newsearch-container">
        <label className="back-btn" onClick={() => navigate(-1)}>
          <IoIosArrowBack /> Back
        </label>

        <div className="form-page new-profile">
          <h1>Start a new referrals search</h1>
          <div className="switcher-mode">
            <label htmlFor="switcher">Use our integration form</label>
            <input
              id="switcher"
              type="checkbox"
              className="toggle toggle-primary"
              onClick={linkedinUrlMode}
            />
            <label htmlFor="switcher">Use linkedin people search string</label>
          </div>

          {/* form */}
          {!switchToLinkedinUrlMode && (
            <form onSubmit={handleNewSearch}>
              <div className="big-group">
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Google"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyurl">Company URL</label>
                  <input
                    id="companyurl"
                    type="text"
                    placeholder="https://www.linkedin.com/company/google/"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <input
                    id="position"
                    type="text"
                    placeholder="Recruiter"
                    className="input input-bordered w-full"
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

                {isLoading ? (
                  <button className="btn btn-primary w-full loading">
                    Scraping...
                  </button>
                ) : (
                  <button className="btn btn-primary w-full">
                    Start Scraping
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
                    placeholder="https://www.linkedin.com/company/google/people/?keywords=re..."
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

export default ReferralSearch;
