import React from "react";
import "./News.css";
import { data } from "./newsData";
import { Box, Button, Card, CardBody } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const News = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="news">
        <div className="news__content">
          <div className="news__text">
            <h2>Latest News</h2>
          </div>
          <h3>Featured</h3>
          <div className="news__grid">
            {data.map((item) => {
              return (
                <div className="" key={item.id}>
                  <Card>
                    <motion.img
                      whileHover={{ scale: 0.9 }}
                      src={item.Image}
                      alt=""
                    />
                    <CardBody>
                      <Link>
                        <h2>{item.title}</h2>
                      </Link>
                      <p>{item.text.substring(0, 150)}</p>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant={"outline"}
              colorScheme="twitter"
              onClick={() => navigate("/trending-news")}
            >
              See More News
            </Button>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
