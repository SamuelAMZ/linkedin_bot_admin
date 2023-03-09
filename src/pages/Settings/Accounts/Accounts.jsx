import React, { useState, useContext } from "react";

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
import { FiLinkedin } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Accounts = () => {
  // user session
  const { login, changeLogin } = useContext(UserContext);

  // popups state
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  // handle new account form submition
  const [formInputs, setFormInputs] = useState({
    type: "linkedin",
    name: "",
    email: "",
    password: "",
  });
  const [loadingAddNew, setLoadingAddNew] = useState(false);
  const handleNewAccount = async (e) => {
    e.preventDefault();

    // sending request
    try {
      // loading
      setLoadingAddNew(true);

      // data
      const dataToSend = { ...formInputs, uid: login?.user?.id };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/new-app-account");

      if (serverMessage.code === "bad") {
        console.log(serverMessage.message);
        notif(serverMessage.message);

        return setLoadingAddNew(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        // empty fields
        setFormInputs({
          type: "linkedin",
          name: "",
          email: "",
          password: "",
        });

        setLoadingAddNew(false);

        // close popup
        setPopupIsOpen(false);

        // refresh account items
        allRefetch();

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // load all accounts
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

  // helper setting current account to edit
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const helpCurrentAccountSetting = (id) => {
    // set current account opened
    setCurrentAccountId(id);
  };

  // load single account data
  const [singleAccountData, setSingleAccountData] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
  });
  const [singleAccountLoading, setSingleAccountLoading] = useState(false);
  const handleFetchSingleData = async (id) => {
    // setting current account to edit
    helpCurrentAccountSetting(id);

    // loading
    setSingleAccountLoading(true);

    try {
      // data
      const dataToSend = { appAccountId: id, uid: login?.user?.id };

      // send req
      const serverMessage = await postReq(
        dataToSend,
        "/api/single-app-account"
      );

      if (serverMessage.code === "bad") {
        console.log(serverMessage.message);
        notif(serverMessage.message);

        return setSingleAccountLoading(false);
      }

      if (serverMessage.code === "ok") {
        setSingleAccountData(serverMessage.payload);

        setSingleAccountLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // edit single account
  const [loadingEditAccount, setLoadingEditAccount] = useState(false);
  const handleEditSingleAccount = async (e) => {
    e.preventDefault();

    // sending request
    try {
      // loading
      setLoadingEditAccount(true);

      // data
      const dataToSend = {
        ...singleAccountData,
        uid: login?.user?.id,
        appAccountId: currentAccountId,
      };

      // send req
      const serverMessage = await postReq(dataToSend, "/api/edit-app-account");

      if (serverMessage.code === "bad") {
        console.log(serverMessage.message);
        notif(serverMessage.message);
        return setLoadingEditAccount(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        // empty fields
        setSingleAccountData({
          type: "linkedin",
          name: "",
          email: "",
          password: "",
        });

        setLoadingEditAccount(false);

        // close popup
        setPopupIsOpen(false);

        // refresh account items
        allRefetch();

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // remove single account
  const [loadingRemovingAccount, setLoadingRemovingAccount] = useState(false);
  const handleRemoveSingleAccount = async () => {
    // sending request
    try {
      // loading
      setLoadingRemovingAccount(true);

      // data
      const dataToSend = {
        uid: login?.user?.id,
        appAccountId: currentAccountId,
      };

      // send req
      const serverMessage = await postReq(
        dataToSend,
        "/api/remove-app-account"
      );

      if (serverMessage.code === "bad") {
        console.log(serverMessage.message);
        notif(serverMessage.message);
        return setLoadingRemovingAccount(false);
      }

      // set data
      if (serverMessage.code === "ok") {
        notif(serverMessage.message);

        setLoadingRemovingAccount(false);

        // close popup
        setPopupIsOpen(false);

        // refresh account items
        allRefetch();

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="accounts-wrapper">
        <div className="account-elements">
          {/* new */}
          {login && (
            <>
              <label
                htmlFor="newaccount"
                className="account-element add-new"
                onClick={() => setPopupIsOpen(true)}
              >
                <div className="icon">
                  <AiFillPlusCircle />
                </div>
                <p>New</p>
              </label>

              {/* accounts added dynamicly */}
              {!allError &&
                allAccountsData?.payload?.map((item, idx) => {
                  return (
                    <div className="account-element" key={idx}>
                      <div className="icon">
                        {item.type === "linkedin" && <FiLinkedin />}
                        {item.type === "indeed" && <SiIndeed />}
                      </div>
                      <div className="details">
                        <div className="item">
                          <p>Type:</p>
                          <p>{item.type}</p>
                        </div>
                        <div className="item">
                          <p>Email:</p>
                          <p>
                            {item.email.substr(0, 13)}
                            {item.email.length >= 13 && "..."}
                          </p>
                        </div>
                      </div>
                      <div
                        className="actions"
                        onClick={() => setPopupIsOpen(true)}
                      >
                        <label
                          htmlFor="editaccount"
                          className="action edit"
                          onClick={() => handleFetchSingleData(item._id)}
                        >
                          <BiEdit />
                        </label>
                        <label
                          htmlFor="removeaccount"
                          className="action remove"
                          onClick={() => helpCurrentAccountSetting(item._id)}
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

      {popupIsOpen && (
        <>
          {/* new account popup */}
          <div className="popups">
            <input type="checkbox" id="newaccount" className="modal-toggle" />
            <label htmlFor="newaccount" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Add new account</h3>
                <form onSubmit={handleNewAccount}>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>

                    <select
                      className="select select-bordered w-full"
                      value={formInputs.type}
                      onChange={(e) =>
                        setFormInputs({
                          type: e.target.value,
                          name: formInputs.name,
                          email: formInputs.name,
                          password: formInputs.password,
                        })
                      }
                    >
                      <option value="linkedin">Linkedin</option>
                      <option value="indeed">Indeed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name on account</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={formInputs.name}
                      onChange={(e) =>
                        setFormInputs({
                          type: formInputs.type,
                          name: e.target.value,
                          email: formInputs.email,
                          password: formInputs.password,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="JohnDoe@gmail.com"
                      className="input input-bordered w-full"
                      value={formInputs.email}
                      onChange={(e) =>
                        setFormInputs({
                          type: formInputs.type,
                          name: formInputs.name,
                          email: e.target.value,
                          password: formInputs.password,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={formInputs.password}
                      onChange={(e) =>
                        setFormInputs({
                          type: formInputs.type,
                          name: formInputs.name,
                          email: formInputs.email,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  {loadingAddNew ? (
                    <button className="btn btn-primary w-full loading">
                      Adding...
                    </button>
                  ) : (
                    <button className="btn btn-primary w-full">Add</button>
                  )}
                </form>
              </label>
            </label>
          </div>

          {/* edit account popup */}
          <div className="popups">
            <input type="checkbox" id="editaccount" className="modal-toggle" />
            <label htmlFor="editaccount" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Edit account</h3>
                <form onSubmit={handleEditSingleAccount}>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>

                    <select
                      className="select select-bordered w-full"
                      value={
                        singleAccountLoading
                          ? "loading..."
                          : singleAccountData?.type
                      }
                      onChange={(e) =>
                        setSingleAccountData({
                          type: e.target.value,
                          name: singleAccountData.name,
                          email: singleAccountData.email,
                          password: singleAccountData.password,
                        })
                      }
                    >
                      <option value="linkedin">Linkedin</option>
                      <option value="indeed">Indeed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name on account</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={
                        singleAccountLoading
                          ? "loading..."
                          : singleAccountData?.name
                      }
                      onChange={(e) =>
                        setSingleAccountData({
                          type: singleAccountData.type,
                          name: e.target.value,
                          email: singleAccountData.email,
                          password: singleAccountData.password,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="JohnDoe@gmail.com"
                      className="input input-bordered w-full"
                      value={
                        singleAccountLoading
                          ? "loading..."
                          : singleAccountData?.email
                      }
                      onChange={(e) =>
                        setSingleAccountData({
                          type: singleAccountData.type,
                          name: singleAccountData.name,
                          email: e.target.value,
                          password: singleAccountData.password,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={singleAccountData.password}
                      onChange={(e) =>
                        setSingleAccountData({
                          type: singleAccountData.type,
                          name: singleAccountData.name,
                          email: singleAccountData.email,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  {loadingEditAccount ? (
                    <button className="btn btn-primary w-full loading">
                      Updating...
                    </button>
                  ) : (
                    <button className="btn btn-primary w-full">Update</button>
                  )}
                </form>
              </label>
            </label>
          </div>

          {/* remove account popup */}
          <div className="popups">
            <input
              type="checkbox"
              id="removeaccount"
              className="modal-toggle"
            />
            <label htmlFor="removeaccount" className="modal cursor-pointer">
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
                  {loadingRemovingAccount ? (
                    <button className="btn btn-primary loading">
                      Removing...
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleRemoveSingleAccount}
                    >
                      Yes remove account
                    </button>
                  )}
                </div>
              </label>
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default Accounts;
