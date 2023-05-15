import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../Firebase/Config";
import "./Gallery.css";

const Gallery = () => {
  const [post, setPost] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initRef = useRef();
  const userDocREf = query(
    collection(db, "images"),
    orderBy("timestamp", "desc")
  );

  const getFunc = async () => {
    onSnapshot(userDocREf, (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(true);
    });
  };

  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "images", PostId));
      const updatePost = post.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the Post");
      navigate("/photo-gallery", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFunc();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email === "mayatunde@gmail.com";
        setAdmin(userEmail);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div className="gallery__top">
        <div className="gallery">
          {!loading ? (
            <Flex justifyContent={"center"} alignItems="center">
              {/* <Spinner msg={"Image  Loading...."} /> */}
            </Flex>
          ) : (
            <div className="gallery__card">
              {post &&
                post.map((data) => {
                  return (
                    <div className="cardPost" key={data?.imageUrl}>
                      <Card maxW="sm">
                        <Image
                          src={data?.imageUrl}
                          alt="Event Image"
                          borderRadius="lg"
                        />
                        <CardBody className="gallery_body">
                          <h6>Photo Comments:</h6>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems="center"
                          >
                            <p>{data?.desc}</p>

                            {admin && (
                              <Box>
                                <Popover closeOnEsc initialFocusRef={initRef}>
                                  {({ onClose }) => (
                                    <>
                                      <PopoverTrigger>
                                        <Button colorScheme={"orange"}>
                                          <CiTrash fontSize={23} color="#fff" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                      >
                                        <PopoverBody fontSize={13}>
                                          Are you sure you want to remove this
                                          photo?
                                        </PopoverBody>
                                        <PopoverFooter
                                          display="flex"
                                          justifyContent="flex-end"
                                        >
                                          <ButtonGroup size="sm">
                                            <Button
                                              variant="outline"
                                              onClick={onClose}
                                              ref={initRef}
                                            >
                                              No
                                            </Button>
                                            <Button
                                              colorScheme="red"
                                              onClick={() =>
                                                handleDelete(data?.id)
                                              }
                                            >
                                              Yes
                                            </Button>
                                          </ButtonGroup>
                                        </PopoverFooter>
                                      </PopoverContent>
                                    </>
                                  )}
                                </Popover>
                              </Box>
                            )}
                          </Flex>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
