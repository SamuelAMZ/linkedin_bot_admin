import React from "react";

// components
import Table from "../../../components/Table/Table";

const ReferralList = () => {
  const tableConf = { perPage: "7", target: "linkedin-referrals" };

  return (
    <div className="linkedin-table">
      {/* table */}
      <Table conf={tableConf} />
    </div>
  );
};

export default ReferralList;
