import React from "react";

const SingleProfile = () => {
  return (
    <div className="form-page new-profile">
      <h1>Update profile</h1>

      <form className="new-profile-form">
        <div className="big-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Product manager"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cv">CV</label>
            <input
              type="file"
              id="cv"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cl">Cover Letter</label>
            <input
              type="file"
              id="cl"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link to an account</label>

            <select className="select select-bordered w-full">
              <option value="linkedin">Linkedin</option>
              <option value="linkedin">Linkedin</option>
              <option value="linkedin">Linkedin</option>
            </select>
          </div>
          <div className="btns">
            <button className="btn btn-outline w-full">add new question</button>
            <button className="btn btn-primary w-full">Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleProfile;
