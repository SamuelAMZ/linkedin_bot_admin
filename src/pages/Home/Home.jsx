import React from "react";

// components
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header page={"Home"} />

      <div className="home-container centerer">
        <p>Home content</p>
      </div>
    </>
  );
};

export default Home;
