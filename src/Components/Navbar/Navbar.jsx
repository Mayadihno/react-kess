import React, { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { TbOlympics } from "react-icons/tb";
import "./Navbar.css";
import Menubar from "./Menubar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__flex">
            <div className="navbar__left">
              <Link to={"/"}>
                <div className="navbar__logo">
                  <div className="logo">
                    <i>
                      <TbOlympics size={35} />
                    </i>
                    <span>Olympic game</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="navbar__middle">
              <div className="navbar__menu">
                <Menubar />
              </div>
            </div>
          </div>
        </div>
        <div
          className="navbar__menu__container"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <RiCloseLine
              size={35}
              color="white"
              onClick={() => setToggle(false)}
            />
          ) : (
            <AiOutlineMenu
              size={35}
              color="white"
              onClick={() => setToggle(true)}
            />
          )}
          {toggle && (
            <div className="navbar__container__menu scale-up-center">
              <div className="navbar__links">
                <Menubar />
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
