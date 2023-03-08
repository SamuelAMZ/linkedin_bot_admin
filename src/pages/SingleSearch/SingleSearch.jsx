import React, { useEffect } from "react";
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
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // fetch single job search data from api
  // req
  const handlePageLoading = async () => {
    // send req
    return await postReq({ id: params.searchid }, "/api/singleSearch");
  };

  const {
    data: searchData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery([`${location.pathname}single`], handlePageLoading, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

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
                <button className="btn btn-outline changed">
                  <MdRemoveCircleOutline /> <p>Exclude Selected Jobs</p>
                </button>
                <button className="btn btn-outline btn-primary changed">
                  <BsCheck2All /> <p>Include Selected Jobs</p>
                </button>

                {searchData && searchData.code === "ok" && (
                  <p>{searchData?.payload?.allResults.length} items</p>
                )}
              </div>
            </div>
            {/* table */}
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
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
                {searchData?.payload?.allResults.map((elm) => {
                  return (
                    <tr>
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                          />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={elm.img} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {elm.company.substr(0, 15)}
                              {elm.company.length >= 15 && "..."}
                            </div>
                            <div className="text-sm opacity-50">
                              {elm.location.substr(0, 20)}
                              {elm.location.length >= 20 && "..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {elm.title.substr(0, 40)}
                        {elm.title.length >= 40 && "..."}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {elm.location.substr(0, 20)}
                          {elm.location.length >= 20 && "..."}
                        </span>
                      </td>
                      <td>
                        <a href={elm?.url} target="_blank">
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
              <div className="elms">
                <button className="btn">Previous</button>
                <p>Page 1 of 1</p>

                <button className="btn">Next</button>
              </div>
            </div>
          </div>

          {/* resume section */}
          <div className="single-search-resume">
            <h2>Actions Summary</h2>

            <ul>
              <li>
                <p>
                  You <span>excluded 10 jobs</span>
                </p>
              </li>
              <li>
                <p>
                  We will apply to the <span>25 remaining jobs</span>
                </p>
              </li>
              <li>
                <p>
                  Profile <span>"Software Engineer"</span> will be used for
                  applying
                </p>
              </li>
              <li>
                <p>
                  Account <span>"Linkedin - jhondoe@gm..."</span> will be used
                  for applying
                </p>
              </li>
            </ul>

            <button className="btn btn-capitilized">Export data as CSV</button>
          </div>
        </div>

        {/* next button */}
        <div className="next-buttons">
          <button className="btn btn-outline  gap-2  btn-capitilized">
            Save & continue later
            <FaRegSave />
          </button>
          <button className="btn btn-outline  gap-2 btn-primary btn-capitilized">
            Schedule Applying Date
            <MdScheduleSend />
          </button>
          <button className="btn btn-primary  gap-2 btn-capitilized">
            Start Applying Now
            <VscDebugStart />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleSearch;
