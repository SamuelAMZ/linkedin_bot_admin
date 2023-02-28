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
        <div className="single-seach-container">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Company</th>
                  <th>Job Detail</th>
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
                                <input type="checkbox" className="checkbox" />
                              </label>
                            </th>
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
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={elm.img} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              <a
                                href={elm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {elm.company.substr(0, 20)}
                                {elm.company.length >= 20 && "..."}
                              </a>
                            </div>
                            <div className="text-sm opacity-50">
                              {elm.location.substr(0, 20)}
                              {elm.location.length >= 20 && "..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {elm.title}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {elm.location}
                        </span>
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
        </div>
      </div>
    </>
  );
};

export default SingleSearch;
