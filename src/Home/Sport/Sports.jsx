/* eslint-disable react/jsx-key */
import React from "react";
import "./Sport.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { data } from "./sportData";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Button } from "@chakra-ui/react";
const Sports = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="splide__text">
        <h2>What’s your favourite sport?</h2>
        <p>Swipe right to See more sport</p>
      </div>
      <div className="splide">
        <div className="splide__content">
          <Splide
            options={{
              perPage: 3,
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                767: {
                  perPage: 3,
                },
                640: {
                  perPage: 1,
                },
              },
              drag: "free",
              type: "loop",
              pagination: false,
              arrows: false,
              autoplay: "true",
              autoScroll: {
                speed: -1,
              },
              gap: "3rem",
            }}
          >
            {data.map((items) => {
              return (
                <SplideSlide key={items.id}>
                  <motion.div
                    whileHover={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="items-image"
                  >
                    <Link>
                      <img src={items.image} alt="" />
                    </Link>
                  </motion.div>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant={"outline"}
          colorScheme="twitter"
          onClick={() => navigate("/our-sport")}
        >
          See More Sport
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Sports;
