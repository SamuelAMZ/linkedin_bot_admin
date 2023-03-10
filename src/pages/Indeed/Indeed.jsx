import React from "react";

// componenets
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const Indeed = () => {
  const tableConf = { perPage: "20", target: "indeed-jobs" };

  return (
    <>
      <Header page={"All Indeed Searches"} />

      <div className="searches-container centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Indeed;
