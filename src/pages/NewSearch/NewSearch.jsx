import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// icons
import { IoIosArrowBack } from "react-icons/io";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../helpers/postReq";

const NewSearch = () => {
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

  return (
    <>
      <Header page={"New Search"} />

      {/* new search */}
      <div className="centerer newsearch-container">
        <div className="newsearch-elements">
          {/* back */}
          <button className="btn btn-link" onClick={() => navigate(-1)}>
            <IoIosArrowBack /> Back
          </button>
          {/* form */}
          <div className="heading">
            <h2>Start a new search</h2>
          </div>

          <form onSubmit={handleNewSearch}>
            <div>
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

            <div>
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

            <div>
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

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="joe@gmail.com"
                className="input input-bordered w-full"
                value={searchData.email}
                onChange={(e) => handleChanges(e, "email")}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="text"
                placeholder="*********"
                className="input input-bordered w-full"
                value={searchData.password}
                onChange={(e) => handleChanges(e, "password")}
                required
              />
            </div>

            {isLoading ? (
              <button className="btn btn-primary loading">Scraping...</button>
            ) : (
              <button className="btn btn-primary">Start Scraping</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSearch;
