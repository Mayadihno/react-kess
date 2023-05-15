import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import { auth, db } from "../../Firebase/Config";

const Googles = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Check if user is already authenticate with that email
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setDoc(docRef, {
          fullname: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/fixturesRoute");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Google Provider error");
    }
  };
  return (
    <React.Fragment>
      <div className="buttons">
        <Button variant={"outline"} colorScheme="red" onClick={handleClick}>
          <FcGoogle fontSize={25} style={{ marginRight: "10px" }} />
          Google
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Googles;
