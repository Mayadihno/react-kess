import React from "react";
import "./OurSport.css";
import { data } from "./ourSportData";
import { Card, CardHeader } from "@chakra-ui/react";
const OurSport = () => {
  return (
    <React.Fragment>
      <div className="ourSport">
        <div className="ourSportBackgroungImage">
          <div className="oursport__heading">
            <h2>Our Sports</h2>
          </div>
        </div>
        <div className="ourSport__text">
          <p>
            Tokyo Olympic is offering 15 sport disciplines as part of olympic
            games 2023. All sports are free and accessible for visitors. There
            is no admission charge and all sports venues are open for this
            purpose. Don’t forget to sign up to view Trending Videos and see
            various fixtures. We are looking forward seeing you in Tokyo 2023!
          </p>
        </div>
        <div className="ourSport__content">
          <div className="ourSport__grid">
            {data.map((item) => {
              return (
                <div className="" key={item.id}>
                  <Card maxW={"sm"}>
                    <CardHeader className="header">
                      <h2>{item.title}</h2>
                    </CardHeader>
                    <div className="image">
                      <img src={item.image} alt="" />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OurSport;
