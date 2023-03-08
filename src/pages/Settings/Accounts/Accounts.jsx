import React from "react";
// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";

const Accounts = () => {
  return (
    <>
      <div className="accounts-wrapper">
        <div className="account-elements">
          {/* new */}
          <label htmlFor="newaccount" className="account-element add-new">
            <div className="icon">
              <AiFillPlusCircle />
            </div>
            <p>New</p>
          </label>

          {/* accounts added dynamicly */}
          <div className="account-element">
            <div className="icon">
              <FiLinkedin />
            </div>
            <div className="details">
              <div className="item">
                <p>Type:</p>
                <p>Linkedin</p>
              </div>
              <div className="item">
                <p>Email:</p>
                <p>johndoe@gma...</p>
              </div>
            </div>
            <div className="actions">
              <div className="action edit">
                <BiEdit />
              </div>
              <div className="action remove">
                <MdRemoveCircleOutline />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* popup */}
      <div className="popups">
        <input type="checkbox" id="newaccount" className="modal-toggle" />
        <label htmlFor="newaccount" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Add new account</h3>
            <form>
              <div className="form-group">
                <label htmlFor="type">Type</label>

                <select className="select select-bordered w-full">
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="JohnDoe@gmail.com"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  placeholder="********"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full">Add</button>
            </form>
          </label>
        </label>
      </div>
    </>
  );
};

export default Accounts;
