import React, { useState, useContext, useEffect } from "react";

// contexts
import UserContext from "../../../../contexts/UserContext";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../../../helpers/postReq";
import notif from "../../../../helpers/notif";

const NewProfile = () => {
  // user session
  const { login, changeLogin } = useContext(UserContext);

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
      appAccountId: profileData.appAccountId,
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

  // handle create new profile
  const [profileData, setProfileData] = useState({
    title: "",
    cv,
    cl,
    appAccountId: "",
  });
  const handleCreateNewProfile = async (e) => {
    e.preventDefault();

    console.log(profileData);
  };

  return (
    <div className="form-page new-profile">
      <h1>New profile</h1>

      <form className="new-profile-form" onSubmit={handleCreateNewProfile}>
        <div className="big-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              required
              id="title"
              type="text"
              placeholder="Product manager"
              className="input input-bordered w-full"
              value={profileData.title}
              onChange={(e) =>
                setProfileData({
                  appAccountId: profileData.appAccountId,
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
              value={profileData.appAccountId}
              onChange={(e) =>
                setProfileData({
                  appAccountId: e.target.value,
                  title: profileData.title,
                  cv,
                  cl,
                })
              }
            >
              {allAccountsLoading && <option>Loading accounts...</option>}
              <option>Choose oan account</option>
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
            {/* <button className="btn btn-outline w-full">add new question</button> */}
            <button className="btn btn-primary w-full">
              Create New Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProfile;
