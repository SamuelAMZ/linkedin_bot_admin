import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// react csv
import { CSVLink, CSVDownload } from "react-csv";

// import notify
import notif from "../../helpers/notif";

// icons
import { IoFilter } from "react-icons/io5";
import { BsCheck2All } from "react-icons/bs";
import { MdRemoveCircleOutline, MdScheduleSend } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { FaRegSave } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";

const SingleSearch = () => {
  const { searchid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState("0");
  const [perPage, setPerPage] = useState("15");

  // fetch single job search data from api
  // req
  const handlePageLoading = async () => {
    // send req
    return await postReq(
      { id: searchid, perPage, pageNumber },
      "/api/singleSearch"
    );
  };
  const {
    data: searchData,
    isLoading,
    refetch,
  } = useQuery(
    [`${location.pathname}single`, perPage, pageNumber],
    handlePageLoading,
    {
      refetchOnWindowFocus: false,
      enabled: true,
      refetchInterval: 5000,
    }
  );

  //  handle next and prev
  const handleNext = () => {
    // check if page available
    if (
      Number(pageNumber) + 1 ===
      Math.ceil(searchData.length / Number(perPage))
    ) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) + 1));
  };

  const handlePrev = () => {
    // check if page available
    if (Number(pageNumber) === 0) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) - 1));
  };

  // handle select and deselect
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const handleSelections = async (jobId, action) => {
    // sending request

    setLoadingUpdate(true);

    try {
      // data
      const dataToSend = { jobId, action };

      // send req
      const serverMessage = await postReq(
        dataToSend,
        "/api/update-single-job-selection"
      );

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);
        return setLoadingUpdate(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        await refetch();
        await refetchSummaryData();
        setLoadingUpdate(false);
      }
    } catch (err) {
      console.log(err);
      notif("something wrong, please retry later");
      setLoadingUpdate(false);
    }
  };

  // single search summary data fetching
  const handleSummaryDataFetching = async () => {
    // send req
    return await postReq({ id: searchid }, "/api/single-search-summary-data");
  };
  const {
    data: summaryData,
    isLoading: summaryDataLoading,
    refetch: refetchSummaryData,
  } = useQuery(
    [`${location.pathname}singlesummary`],
    handleSummaryDataFetching,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const handleSummaryInfofetching = async () => {
    // send req
    return await postReq({ id: searchid }, "/api/single-search-summary-info");
  };
  const {
    data: summaryInfoData,
    isLoading: summaryInfoDataLoading,
    refetch: refetchSummaryInfoData,
  } = useQuery(
    [`${location.pathname}singlesummaryinfo`],
    handleSummaryInfofetching,
    {
      refetchOnWindowFocus: false,
      enabled: true,
      refetchInterval: 5000,
    }
  );

  // handle download csv
  const [csvData, setCsvData] = useState([]);
  const [csvDataLoading, setCsvDataLoading] = useState(false);
  const handleDownloadCsv = async () => {
    setCsvDataLoading(true);
    // fetch all data
    try {
      // loading
      setCsvDataLoading(true);

      // data
      const dataToSend = { id: searchid, perPage: "10000", pageNumber: "0" };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/singleSearch");

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);
        return setCsvDataLoading(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        // create csv
        const csvHeader = ["Title", "Company", "Location", "Logo", "Job URL"];
        const csvBody = [];

        serverMessage.payload.forEach((elm) => {
          csvBody.push([
            elm.title,
            elm.company,
            elm.location,
            elm.logo,
            elm.jobUrl,
          ]);
        });

        // set csv data
        setCsvData([csvHeader, ...csvBody]);

        notif("CSV generated successfully");
      }
    } catch (err) {
      console.log(err);
      notif("something wrong, please retry later");
      setCsvDataLoading(false);
    }
  };

  // save status
  const [saveStatusLoading, setSaveStatusLoading] = useState(false);
  const handleSaveStatus = () => {
    setSaveStatusLoading(true);

    let setId = setTimeout(() => {
      setSaveStatusLoading(false);
      // succes message
      notif("successfully saved");
      // redirect to the all search page
      navigate("/linkedin");
    }, 1000);
  };

  // stop search
  const [stopingSearch, setStopingSearch] = useState(false);
  const handleStopSearch = async () => {
    setStopingSearch(true);
    // fetch all data
    try {
      // loading
      setStopingSearch(true);

      // data
      const dataToSend = { searchId: searchid };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/stop-search");

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);
        return setStopingSearch(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);
        setStopingSearch(false);
        await refetchSummaryInfoData();
      }
    } catch (err) {
      console.log(err);
      notif("something wrong, please retry later");
      setStopingSearch(false);
    }
  };

  return (
    <>
      <Header page={"Single Search"} />

      <div className="centerer">
        <div className="single-search-container">
          {/* table start */}
          <div className="overflow-x-auto w-full">
            {/* header */}
            <div className={"table-header expand-search"}>
              <div className="actions">
                {searchData && searchData.code === "ok" && (
                  <>
                    <p>
                      We found: <b>{searchData?.length}</b> jobs - Uncheck the
                      jobs you don't want to apply to
                    </p>
                  </>
                )}
              </div>

              {loadingUpdate && (
                <button className="btn btn-xs btn-outline loading">
                  updating...
                </button>
              )}
              {summaryInfoData?.payload?.status === "loading" && (
                <div className="flex gap-2">
                  <button className="btn btn-xs btn-outline loading">
                    searching jobs...
                  </button>

                  {stopingSearch ? (
                    <button className="btn btn-xs btn-primary loading">
                      Stoping...
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={handleStopSearch}
                    >
                      Stop
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* table */}
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      {/* <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      /> */}
                    </label>
                  </th>
                  <th>Company</th>
                  <th>Job Detail</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {/* loading */}
                {isLoading &&
                  new Array(10).fill("").map((elm, idx) => {
                    return (
                      <tr key={idx}>
                        <SkeletonTheme
                          baseColor="#8b8b8b35"
                          highlightColor="#f9fafb"
                        >
                          <td>
                            <th>
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                />
                              </label>
                            </th>
                          </td>
                          <td>
                            <Skeleton count={1} />
                          </td>
                          <td>
                            <Skeleton count={1} />
                          </td>
                          <td>
                            <Skeleton count={1} />
                          </td>
                        </SkeletonTheme>
                      </tr>
                    );
                  })}

                {/* data 1 */}
                {searchData?.payload.map((elm, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <label>
                          {summaryInfoData?.payload?.status === "loading" ? (
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              disabled
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              checked={elm?.isSelected}
                              onChange={(e) => {
                                handleSelections(elm?._id, e.target.checked);
                              }}
                            />
                          )}
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={elm?.logo} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {elm?.company.substr(0, 15)}
                              {elm?.company.length >= 15 && "..."}
                            </div>
                            <div className="text-sm opacity-50">
                              {elm?.location.substr(0, 20)}
                              {elm?.location.length >= 20 && "..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {elm?.title.substr(0, 40)}
                        {elm?.title.length >= 40 && "..."}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {elm?.location.substr(0, 20)}
                          {elm?.location.length >= 20 && "..."}
                        </span>
                      </td>
                      <td>
                        <a href={elm?.jobUrl} target="_blank">
                          <button className="btn btn-xs btn-primary visit-link">
                            <p>Visit</p>
                            <TbExternalLink />
                          </button>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* foot */}
            </table>
            {/* footer */}
            <div className="table-footer">
              {searchData && searchData.code === "ok" && (
                <div className="elms">
                  <button className="btn" onClick={handlePrev}>
                    Previous
                  </button>
                  <p>
                    {" "}
                    Page {Number(pageNumber) + 1} of{" "}
                    {Math.ceil(searchData?.length / Number(perPage))}
                  </p>

                  <button className="btn" onClick={handleNext}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* resume section */}
          <div className="single-search-resume">
            <h2>Actions Summary</h2>
            {summaryDataLoading &&
              new Array(3).fill("").map((elm, idx) => {
                return (
                  <tr key={idx}>
                    <SkeletonTheme
                      baseColor="#8b8b8b35"
                      highlightColor="#f9fafb"
                    >
                      <li>
                        <Skeleton count={1} />
                      </li>
                    </SkeletonTheme>
                  </tr>
                );
              })}
            {!summaryDataLoading && (
              <ul>
                <li>
                  <p>
                    You <span>excluded {summaryData?.payload} job(s) </span>
                  </p>
                </li>
                <li>
                  <p>
                    We will apply to the{" "}
                    <span>
                      {searchData?.length - summaryData?.payload} remaining jobs
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Profile{" "}
                    <span>"{summaryInfoData?.payload?.profile?.title}"</span>{" "}
                    will be used for applying
                  </p>
                </li>
                <li>
                  <p>
                    Account{" "}
                    <span>
                      "{summaryInfoData?.payload?.account?.type} -{" "}
                      {summaryInfoData?.payload?.account?.email}"
                    </span>{" "}
                    will be used for applying
                  </p>
                </li>
              </ul>
            )}
            {csvData.length > 0 ? (
              <CSVLink
                data={csvData}
                filename={"linkedin-jobs-export.csv"}
                className="btn btn-primary btn-capitilized"
              >
                Export data as CSV
              </CSVLink>
            ) : (
              <>
                {csvDataLoading && (
                  <button className="btn btn-capitilized loading">
                    Generating...
                  </button>
                )}
                {summaryInfoData?.payload?.status === "loading" ? (
                  <button className="btn btn-capitilized" disabled>
                    Generate CSV data
                  </button>
                ) : (
                  !csvDataLoading && (
                    <button
                      className="btn btn-capitilized"
                      onClick={handleDownloadCsv}
                    >
                      Generate CSV data
                    </button>
                  )
                )}
              </>
            )}
          </div>
        </div>

        {/* next button */}
        <div className="next-buttons">
          {/* save status and continue later */}
          {saveStatusLoading ? (
            <button className="btn btn-outline  gap-2  btn-capitilized loading">
              Saving...
              <FaRegSave />
            </button>
          ) : (
            <button
              className="btn btn-outline  gap-2  btn-capitilized"
              onClick={handleSaveStatus}
            >
              Save & continue later
              <FaRegSave />
            </button>
          )}

          {summaryInfoData?.payload?.status === "loading" ? (
            <>
              <button
                className="btn btn-outline  gap-2 btn-primary btn-capitilized"
                disabled
              >
                Schedule Applying Date
                <MdScheduleSend />
              </button>
              <button
                className="btn btn-primary  gap-2 btn-capitilized"
                disabled
              >
                Start Applying Now
                <VscDebugStart />
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline  gap-2 btn-primary btn-capitilized">
                Schedule Applying Date
                <MdScheduleSend />
              </button>
              <button className="btn btn-primary  gap-2 btn-capitilized">
                Start Applying Now
                <VscDebugStart />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleSearch;
