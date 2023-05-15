import React from "react";
import "./Photo.css";
import { data } from "./photoData";
import { motion } from "framer-motion";
import { Box, Button } from "@chakra-ui/react";
const Photo = () => {
  return (
    <React.Fragment>
      <div className="photo">
        <div className="photoBackgroundColor">
          <div className="photo__content">
            <div className="photo__text">
              <h2>Previous Events Photo Gallery</h2>
            </div>
            <div className="photo__grid">
              {data.map((item) => {
                return (
                  <div className="" key={item.id}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={item.image}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "20px",
                pb: "30px",
              }}
            >
              <Button variant={"outline"} colorScheme="twitter">
                See More photo
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Photo;
