import React from "react";
import "./Card.css";
import { data } from "./cardData";
import { Image, Card } from "@chakra-ui/react";
import { motion } from "framer-motion";
const Cards = () => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card__content">
          <div className="card__grid">
            {data.map((item) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{ cursor: "pointer" }}
                  key={item.id}
                >
                  <Card maxW="sm">
                    <Image src={item.image} className="post__image" />
                    <div className="post__text">
                      <h2>{item.title}</h2>
                      <p>{item.value}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <div className="post__para">
            <p>
              Tokyo Olympic game 2023 is a fully inclusive sporting event. The
              games will host 15 different sports and more than 2000 sporters at
              all levels and the event will take place from 27 to 30 July in
              Tokyo. Besides the tournaments, Tokyo Olympic will include lots of
              side activties and events. Tokyo is very proud to host this event!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;
