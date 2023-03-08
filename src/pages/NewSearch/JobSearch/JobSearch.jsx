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

const JobSearch = () => {
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
                    onChange={(e) => handleChanges(e, "keyword")}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="platform">Platform To Target</label>
                  <select
                    id="platform"
                    className="select select-bordered w-full"
                    value={searchData.platform}
                    onChange={(e) => handleChanges(e, "platform")}
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
                    onChange={(e) => handleChanges(e, "country")}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="onsite">On site/Remote/Hybrid</label>
                  <select
                    id="platform"
                    className="select select-bordered w-full"
                  >
                    <option>On site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type">Job type</label>
                  <select id="type" className="select select-bordered w-full">
                    <option>Full time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                    <option>Volunteer</option>
                    <option>Internship</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <select id="type" className="select select-bordered w-full">
                    <option>40k+</option>
                    <option>60k+</option>
                    <option>80k+</option>
                    <option>100k+</option>
                    <option>120k+</option>
                    <option>140k+</option>
                    <option>160k+</option>
                    <option>180k+</option>
                    <option>200k+</option>
                  </select>
                </div>

                <div className="form-group">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Under 10 applicants</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                      />
                    </label>
                  </div>
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
