import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// contexts
import UserContext from "../../../contexts/UserContext";

// helpers
import postReq from "../../../helpers/postReq";
import notif from "../../../helpers/notif";

// react query
import { useQuery } from "react-query";

// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdRemoveCircleOutline } from "react-icons/md";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profiles = () => {
  // user session
  const { login, changeLogin } = useContext(UserContext);

  // load all profiles
  const getAllProfiles = async (e) => {
    // send req
    return await postReq({ uid: login?.user?.id }, "/api/all-app-profiles");
  };
  const {
    data: allProfilesData,
    isLoading: allProfilesLoading,
    isError: allError,
    refetch: allRefetch,
  } = useQuery(["getallprofile", login], getAllProfiles, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // popup state
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [helpCurrentProfileId, setHelpCurrentProfileId] = useState("");

  // remove profile
  const [loadingRemovingProfile, setLoadingRemovingProfile] = useState(false);
  const handleRemoveSingleProfile = async () => {
    // sending request
    try {
      // loading
      setLoadingRemovingProfile(true);

      // data
      const dataToSend = {
        uid: login?.user?.id,
        appProfileId: helpCurrentProfileId,
      };

      // send req
      const serverMessage = await postReq(
        dataToSend,
        "/api/remove-app-profile"
      );

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);
        return setLoadingRemovingProfile(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        setLoadingRemovingProfile(false);

        // close popup
        setPopupIsOpen(false);

        // refresh profile items
        allRefetch();

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="accounts-wrapper profile-wrapper">
        <div className="account-elements">
          {/* new */}
          {login && (
            <>
              <Link to="/settings/profiles/new">
                <label className="account-element add-new">
                  <div className="icon">
                    <AiFillPlusCircle />
                  </div>
                  <p>New</p>
                </label>
              </Link>

              {/* profiles added dynamicly */}
              {!allError &&
                allProfilesData?.payload?.map((item, idx) => {
                  return (
                    <div className="account-element" key={idx}>
                      <div className="icon">
                        <p className="title">{item?.title.substr(0, 1)}</p>
                      </div>
                      <div className="details">
                        <div className="item">
                          <p>Title:</p>
                          <p className="title">
                            {item?.title.substr(0, 13)}
                            {item?.title.length >= 13 && "..."}
                          </p>
                        </div>
                        <div className="item">
                          <p>ID:</p>
                          <p>
                            {item?._id.substr(0, 13)}
                            {item?._id.length >= 13 && "..."}
                          </p>
                        </div>
                      </div>
                      <div className="actions">
                        <Link to={`/settings/profiles/profile/${item?._id}`}>
                          <div className="action edit">
                            <BiEdit />
                          </div>
                        </Link>
                        <label
                          htmlFor="removeprofile"
                          className="action remove"
                          onClick={() => {
                            setHelpCurrentProfileId(item._id);
                            setPopupIsOpen(true);
                          }}
                        >
                          <MdRemoveCircleOutline />
                        </label>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {/* loader when lodin user data */}
          {!login && (
            <>
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton height={150} count={1} />
              </SkeletonTheme>
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton height={150} count={1} />
              </SkeletonTheme>
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton height={150} count={1} />
              </SkeletonTheme>
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton height={150} count={1} />
              </SkeletonTheme>
            </>
          )}
        </div>
      </div>

      {/* remove account popup */}
      {popupIsOpen && (
        <div className="popups">
          <input type="checkbox" id="removeprofile" className="modal-toggle" />
          <label htmlFor="removeprofile" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg font-bold">
                Want to remove this account?
              </h3>
              <div className="flex gap-5 mt-5">
                <button
                  className="btn btn-outline"
                  onClick={() => setPopupIsOpen(false)}
                >
                  Cancel
                </button>
                {loadingRemovingProfile ? (
                  <button className="btn btn-primary loading">
                    Removing...
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleRemoveSingleProfile}
                  >
                    Yes remove profile
                  </button>
                )}
              </div>
            </label>
          </label>
        </div>
      )}
    </>
  );
};

export default Profiles;
