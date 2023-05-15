import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { db } from "../Firebase/Config";

const UploadVideo = () => {
  const [uploadVideo, setUploadVideo] = useState(null);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videosUrl, setVideosUrl] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();

  const handleChanges = (e) => {
    setUploadVideo(e.target.files[0]);
  };
  const handleChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setformData({ ...formData, ...newInput });
  };

  const { videoDesc } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const videoFile = e.target.files[0];

    try {
      const storageRef = ref(storage, `Videos/${uploadVideo.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, uploadVideo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // get the Progress Function
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //Update Progress
          console.log(`progres is ${progress}`);
          setLoading(true);
        },
        (error) => {
          //Error Function
          console.log(error);
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setVideosUrl(url);
            const addRef = collection(db, "videos");
            await addDoc(addRef, {
              videoUrl: url,
              desc: videoDesc,
              timestamp: serverTimestamp(),
            });
            toast.success("Video Upload Successfully");
            navigate("/videos", { replace: true });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="modal">
        <div className="streamer">
          {!loading ? (
            <Card maxW="md" className="card__bg">
              <CardHeader>
                <h2 style={{ textAlign: "center" }}>Post Video</h2>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <div>
                    <Input
                      type={"file"}
                      required
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={handleChanges}
                      placeholder="Upload Video"
                      sx={{ padding: "5px", cursor: "pointer" }}
                    />
                    <div className="textarea" style={{ paddingTop: "20px" }}>
                      <h3>Enter say something about this video</h3>
                      <Textarea onChange={handleChange} name="videoDesc" />
                    </div>
                  </div>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      colorScheme="twitter"
                      mr={3}
                      variant={"solid"}
                      sx={{ mt: "15px" }}
                    >
                      Upload Video
                    </Button>
                  </Box>
                </form>
              </CardBody>
            </Card>
          ) : (
            '<Spinner msg={"Video Uploading do not Refresh Page"} />'
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadVideo;
