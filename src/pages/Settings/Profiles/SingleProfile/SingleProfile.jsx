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
            <label htmlFor="name">Complete Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="first">First Name</label>
            <input
              id="first"
              type="text"
              placeholder="John"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last">Last Name</label>
            <input
              id="last"
              type="text"
              placeholder="Doe"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date of birth</label>
            <input
              id="date"
              type="text"
              placeholder="02/12/2023 (day/month/year)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Mobile phone number</label>
            <input
              id="state"
              type="text"
              placeholder="+1 555 555 5555"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="United States"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street address line 1</label>
            <input
              id="state"
              type="text"
              placeholder="Put Address here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="New York City"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="big-group">
          <div className="form-group">
            <label htmlFor="state">ZIP / Postal Code</label>
            <input
              id="state"
              type="text"
              placeholder="Put code here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State/Province</label>
            <input
              id="state"
              type="text"
              placeholder="New York"
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
            <label htmlFor="gender">Gender</label>
            <select className="select select-bordered w-full">
              <option>Decline to answer</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="race">Race</label>
            <select className="select select-bordered w-full">
              <option>Decline to answer</option>
              <option>Hispanic or Latino</option>
              <option>White, not Hispanic or Latino</option>
              <option>Black or African-American, not Hispanic or Latino</option>
              <option>Asian, not Hispanic or Latino</option>
              <option>
                Native Hawaiian or Other Pacific Islander, not Hispanic or
                Latino
              </option>
              <option>
                American Indian or Alaskan Native, not Hispanic or Latino
              </option>
              <option>Two or More Races, not Hispanic or Latino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="veteran">Veteran status</label>
            <select className="select select-bordered w-full">
              <option>I don't wish to answer</option>
              <option>
                I identify as one or more of the classifications of protected
                veteran listed above
              </option>
              <option>I am not a protected veteran</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="disability">Disability</label>
            <select className="select select-bordered w-full">
              <option>I don't wish to answer</option>
              <option>
                Yes, I Have A Disability, Or Have A History/Record Of Having A
                Disability
              </option>
              <option>
                No, I Don't Have A Disability, Or A History/Record Of Having A
                Disabilit
              </option>
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
