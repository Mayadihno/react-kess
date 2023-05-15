import React from "react";
import "./Partner.css";
import { data } from "./partnerData";
const Partner = () => {
  return (
    <React.Fragment>
      <div className="partner">
        <div className="partner__content">
          <div className="partner__text">
            <h2>Tokyo Olympic 2023 Partners</h2>
          </div>
          <div className="partner__grid">
            {data.map((item) => {
              return (
                <div className="" key={item.id}>
                  <img src={item.image} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Partner;
