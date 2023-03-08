import React from "react";

// componenets
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const Schedules = () => {
  const tableConf = { perPage: "7", target: "schedules" };

  return (
    <>
      <Header page={"Schedules"} />

      <div className="searches-container centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Schedules;
