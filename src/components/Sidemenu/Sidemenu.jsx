import React, { useContext } from "react";
import { Link } from "react-router-dom";

// contexts
import MenuOpenContext from "../../contexts/MenuOpen";

// icons
import { MdClose } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const Sidemenu = () => {
  const { menuOpen, changeMenuOpen } = useContext(MenuOpenContext);

  return (
    <>
      <div className="back" onClick={() => changeMenuOpen(false)}></div>
      <div className="side-menu">
        <ul onClick={() => changeMenuOpen(false)}>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/linkedin">
            <li>Linkedin</li>
          </Link>
          <Link to="/Indeed">
            <li>Indeed</li>
          </Link>
          <Link to="/settings">
            <li>Settings</li>
          </Link>
        </ul>

        <Link to="/logout">
          <div
            className="mobile-account btn btn-primary"
            onClick={() => changeMenuOpen(false)}
          >
            <p>Logout</p>
            <BsArrowRight className="icon" />
          </div>
        </Link>
      </div>
      <div className="close" onClick={() => changeMenuOpen(false)}>
        <MdClose />
      </div>
    </>
  );
};

export default Sidemenu;
