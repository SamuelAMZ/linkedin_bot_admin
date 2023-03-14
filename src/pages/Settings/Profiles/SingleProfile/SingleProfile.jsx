import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// contexts
import UserContext from "../../../../contexts/UserContext";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../../../helpers/postReq";
import notif from "../../../../helpers/notif";

const SingleProfile = () => {
  // user session
  const { login, changeLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { profileid } = useParams();

  // upload csv handler
  const [cvUploadLoading, setCvUploadLoading] = useState(false);
  const [cv, setCv] = useState("");
  const HandleUploadCv = async () => {
    // start uploading state
    setCvUploadLoading(true);

    const url = "https://api.cloudinary.com/v1_1/djfeygtly/image/upload";

    const files = document.querySelector("#cv").files;

    // restrict files size
    let MAXFILESIZE = 2;
    let found = [];
    Array.from(files).forEach((elm) => {
      if (elm.size / 1024 / 1000 > MAXFILESIZE) {
        found.push(1);
      }
    });
    if (found.length >= 1) {
      notif(`files must be less than ${MAXFILESIZE}MB`);
      return;
    }

    const formData = new FormData();

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "asv6k5vp");

        notif("uploading CV...");

        const send = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await send.json();

        if (data.error) {
          return notif(data.error.message);
        }

        // set cv url
        setCv(data?.secure_url);

        notif("CV uploaded!");

        // stop uploading state
        setCvUploadLoading(false);

        return;
      }
    } catch (error) {
      console.log(error);

      notif("error uploading CV, retry later");

      // set cv
      setCv("");

      // stop uploading state
      setCvUploadLoading(false);
    }
  };

  // upload csv handler
  const [clUploadLoading, setClUploadLoading] = useState(false);
  const [cl, setCl] = useState("");
  const HandleUploadCl = async () => {
    // start uploading state
    setClUploadLoading(true);

    const url = "https://api.cloudinary.com/v1_1/djfeygtly/image/upload";

    const files = document.querySelector("#cl").files;

    // restrict files size
    let MAXFILESIZE = 2;
    let found = [];
    Array.from(files).forEach((elm) => {
      if (elm.size / 1024 / 1000 > MAXFILESIZE) {
        found.push(1);
      }
    });
    if (found.length >= 1) {
      notif(`files must be less than ${MAXFILESIZE}MB`);
      return;
    }

    const formData = new FormData();

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "p4eqr6qb");

        notif("uploading Cover Letter...");

        const send = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await send.json();

        if (data.error) {
          return notif(data.error.message);
        }

        // set cv url
        setCl(data?.secure_url);

        notif("Cover Letter uploaded!");

        // stop uploading state
        setClUploadLoading(false);

        return;
      }
    } catch (error) {
      console.log(error);

      notif("error uploading cover letter, retry later");

      // set cv
      setCl("");

      // stop uploading state
      setClUploadLoading(false);
    }
  };

  // effect to check and set cv and cl url when uploaded
  useEffect(() => {
    // set profile data state
    setProfileData({
      accountLinked: profileData.accountLinked,
      title: profileData.title,
      cv,
      cl,
    });
  }, [cl, cv]);

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

  // handle update profile
  const [profileData, setProfileData] = useState({
    title: "",
    cv,
    cl,
    accountLinked: "",
  });
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // sending request
    try {
      // loading
      setLoadingUpdateProfile(true);

      // data
      const dataToSend = {
        ...profileData,
        uid: login?.user?.id,
        appProfileId: profileid,
      };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/edit-app-profile");

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);

        return setLoadingUpdateProfile(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        setLoadingUpdateProfile(false);

        // redirect to the profiles page
        return navigate("/settings/profiles");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // loading single profile
  const [singleProfileLoading, setSingleProfileLoading] = useState(false);
  const handleFetchSingleData = async () => {
    // loading
    setSingleProfileLoading(true);

    try {
      // data
      const dataToSend = { appProfileId: profileid, uid: login?.user?.id };

      // send req
      const serverMessage = await postReq(
        dataToSend,
        "/api/single-app-profile"
      );

      if (serverMessage.code === "bad") {
        notif(serverMessage.message);

        return setSingleProfileLoading(false);
      }

      if (serverMessage.code === "ok") {
        setProfileData(serverMessage.payload);

        setSingleProfileLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (() => {
      if (login) {
        handleFetchSingleData();
      }
    })();
  }, [login]);

  return (
    <div className="form-page new-profile">
      <h1>Update Profile</h1>

      <form className="new-profile-form" onSubmit={handleUpdateProfile}>
        <div className="big-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              required
              id="title"
              type="text"
              placeholder="Product manager"
              className="input input-bordered w-full"
              value={singleProfileLoading ? "loading..." : profileData.title}
              onChange={(e) =>
                setProfileData({
                  accountLinked: profileData.accountLinked,
                  title: e.target.value,
                  cv,
                  cl,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="cv">CV</label>
            <input
              required
              type="file"
              id="cv"
              className="file-input file-input-bordered w-full"
              onChange={HandleUploadCv}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cl">Cover Letter</label>
            <input
              required
              type="file"
              id="cl"
              className="file-input file-input-bordered w-full"
              onChange={HandleUploadCl}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link to an account</label>
            <select
              required
              className="select select-bordered w-full"
              value={profileData.accountLinked}
              onChange={(e) =>
                setProfileData({
                  accountLinked: e.target.value,
                  title: profileData.title,
                  cv,
                  cl,
                })
              }
            >
              {allAccountsLoading && <option>Loading accounts...</option>}
              <option>Choose an account</option>
              {!allError &&
                allAccountsData?.payload?.map((item, idx) => {
                  return (
                    <option
                      value={item._id}
                    >{`${item.type} - ${item.email}`}</option>
                  );
                })}
            </select>
          </div>
          <div className="btns">
            {loadingUpdateProfile ? (
              <button className="btn btn-primary w-full loading">
                Updating...
              </button>
            ) : (
              <button className="btn btn-primary w-full">Update profile</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleProfile;
