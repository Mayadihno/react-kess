import React, { useEffect, useState } from "react";
import "./Admin.css";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TfiClose } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import FixturesUpload from "../Fixtures/FixturesUpload";
import UploadImage from "../Gallery/UploadImages";
import UploadVideo from "../Video/UploadVideo";
const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(true);
  const [fixtures, setfixtures] = useState(true);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);

  const handleFixture = () => {
    setfixtures(true);
    setVideo(false);
    setImage(false);
    onClose();
  };
  const handleImage = () => {
    setfixtures(false);
    setVideo(false);
    setImage(true);
    onClose();
  };
  const handleVideo = () => {
    setfixtures(false);
    setVideo(true);
    setImage(false);
    onClose();
  };

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen, open]);

  return (
    <React.Fragment>
      <div className="admin">
        <div className="adminLeft">
          <div className="button">
            <Button variant={"outline"} colorScheme="twitter" onClick={onOpen}>
              Click to Open sidebar
            </Button>
          </div>
          {!open && (
            <Drawer
              closeOnOverlayClick={false}
              placement={"left"}
              onClose={onClose}
              isOpen={isOpen}
              size={"xs"}
            >
              <DrawerOverlay />
              <DrawerContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <TfiClose fontSize={35} onClick={() => setOpen(onClose)} />
                </Box>
                <Divider />
                <DrawerBody>
                  <div className="upload">
                    <NavLink onClick={handleFixture}>upload fixtures</NavLink>
                    <NavLink onClick={handleVideo}>upload videos</NavLink>
                    <NavLink onClick={handleImage}>upload Images</NavLink>
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          )}
        </div>
        <div className="adminRight">
          <div className="adminRight__content">
            {fixtures && <FixturesUpload />}
            {image && <UploadImage />}
            {video && <UploadVideo />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
