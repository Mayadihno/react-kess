import React from "react";
import Banner from "./Banner/Banner";
import Cards from "./Card/Cards";
import News from "./News/News";
import Sports from "./Sport/Sports";
import Photo from "./Photo/Photo";
import Partner from "./Partner/Partner";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Cards />
      <News />
      <Sports />
      <Photo />
      <Partner />
    </React.Fragment>
  );
};

export default Home;
