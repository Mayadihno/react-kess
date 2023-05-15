import React from "react";
import { TbOlympics } from "react-icons/tb";
import "./Footer.css";
const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="footer__content">
          <div className="navbar__logo">
            <div className="logo">
              <i>
                <TbOlympics size={45} />
              </i>
              <span>Olympic game</span>
            </div>
          </div>
          <p>
            Copyright © 2023 Tokyo Olympic Management Sàrl The OLYMPIC GAME
            CHAMPIONSHIPS name and logos are trademarks of OLYMPIC Management
            Sàrl. All right Reserved.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
