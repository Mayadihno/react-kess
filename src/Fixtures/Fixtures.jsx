import React from "react";
import Badminton from "../Sport/Badminton/Badminton";
import "./Fixtures.css";
import Golf from "../Sport/Golf/Golf";
import Hockey from "../Sport/Hockey/Hockey";
import Football from "../Sport/Football/Football";
import Rowing from "../Sport/Rowing/Rowing";
import Martial from "../Sport/Martial/Martial";
import Squash from "../Sport/Squash/Squash";
import Running from "../Sport/Running/Running";
import Swimming from "../Sport/Swimming/Swimming";
import Tennis from "../Sport/Tennis/Tennis";
import Water from "../Sport/Water-polo/Water";
import Volleyball from "../Sport/Volleyball/Volleyball";
import Table from "../Sport/Table-Tennis/Table";
import Pickleball from "../Sport/Pickleball/Pickleball";
import Ballroom from "../Sport/Ballroom/Ballroom";
const Fixtures = () => {
  return (
    <React.Fragment>
      <div className="fixtures"></div>
      <div className="fixtures__content">
        <div className="fixtures__grid">
          <Badminton />
          <Golf />
          <Hockey />
          <Football />
          <Rowing />
          <Martial />
          <Squash />
          <Running />
          <Swimming />
          <Tennis />
          <Water />
          <Volleyball />
          <Table />
          <Pickleball />
          <Ballroom />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Fixtures;
