import React from "react";

// components
import Table from "../../../components/Table/Table";

const JobList = () => {
  const tableConf = { perPage: "7", target: "linkedin-jobs" };

  return (
    <div className="linkedin-table">
      {/* table */}
      <Table conf={tableConf} />
    </div>
  );
};

export default JobList;
