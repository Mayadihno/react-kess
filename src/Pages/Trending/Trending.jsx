import React from "react";
import "./Trending.css";
import { data } from "./trendingData";
import { Card, CardBody } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Trending = () => {
  return (
    <React.Fragment>
      <div className="trending">
        <div className="trendingBackground">
          <div className="trending__head">
            <h2>Latest news</h2>
          </div>
        </div>
        <div className="trending__content">
          <div className="trending__grid">
            {data.map((item) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className=""
                  key={item.id}
                >
                  <Card maxW={"sm"}>
                    <img src={item.Image} alt="" />
                    <CardBody>
                      <Link>
                        <h3 style={{ textDecoration: "underline" }}>
                          {item.title}
                        </h3>
                      </Link>
                      <p style={{ paddingTop: "20px", lineHeight: "30px" }}>
                        {item.text.substring(0, 150)} ...
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Trending;
