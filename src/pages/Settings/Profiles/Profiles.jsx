import React from "react";
import { Link } from "react-router-dom";

// icons
import { AiFillPlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdRemoveCircleOutline } from "react-icons/md";

const Profiles = () => {
  return (
    <div className="accounts-wrapper profile-wrapper">
      <div className="account-elements">
        {/* new */}
        <Link to="/settings/profiles/new">
          <label className="account-element add-new">
            <div className="icon">
              <AiFillPlusCircle />
            </div>
            <p>New</p>
          </label>
        </Link>

        {/* accounts added dynamicly */}
        <div className="account-element">
          <div className="icon">
            <p>S</p>
          </div>
          <div className="details">
            <div className="item">
              <p>Title:</p>
              <p>Software Engine...</p>
            </div>
            <div className="item">
              <p>ID:</p>
              <p>214554</p>
            </div>
          </div>
          <div className="actions">
            <Link to="/settings/profiles/profile/123545">
              <div className="action edit">
                <BiEdit />
              </div>
            </Link>
            <div className="action remove">
              <MdRemoveCircleOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
