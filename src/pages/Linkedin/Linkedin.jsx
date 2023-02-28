import React from "react";

// componenets
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const Linkedin = () => {
  const tableConf = { perPage: "20", target: "searches" };

  return (
    <>
      <Header page={"All Linkedin Searches"} />

      <div className="searches-container centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Linkedin;
