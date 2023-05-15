import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <React.Fragment>
      <div className="banner">
        <div className="bannerImage"></div>
        <div className="banner__text">
          <h2>Welcome at the Olympic game 2023 in the city of Tokyo!</h2>
          <p>27 | 28 | 29 | 30 July</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
