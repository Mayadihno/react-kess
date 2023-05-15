/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase/Config";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

const SignUp = ({ hide, setHide }) => {
  const [change, setChange] = useState("");
  const [show, setshow] = useState(false);

  const handleChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setChange({ ...change, ...newInput });
  };

  const { password, fullname, email, phoneNumber, confirm } = change;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm) {
        toast.warning("password and confrim password are not corrrect");
        return;
      }
      const users = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: fullname,
        PhoneNumber: phoneNumber,
        Email: email,
      });

      const usersData = users.user;
      const formDataCopy = { ...change };
      delete formDataCopy.password;
      delete formDataCopy.confirm;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", usersData.uid), formDataCopy);
      toast.success("You have successfull create account");
      setHide(true);
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email have already been used");
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        toast.warning("Password should be more than 6 letters");
      } else {
        toast.error("Something went wrong");
        // console.log(error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="signUp">
        <div className="signUp__background">
          <div className="signUp__content">
            <h6
              style={{
                textAlign: "center",
                paddingBottom: "5px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Create Account with email and password
            </h6>
            <form onSubmit={handleSubmit}>
              <div className="name">
                <Input
                  type="text"
                  placeholder="Enter Display Name"
                  id="name"
                  size="md"
                  name="fullname"
                  variant="flushed"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="email">
                <Input
                  type="email"
                  placeholder="Enter Email Address"
                  id="email"
                  name="email"
                  size="md"
                  variant="flushed"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="phones">
                <Input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  id="phone"
                  size="md"
                  name="phoneNumber"
                  required
                  onChange={handleChange}
                  variant="flushed"
                />
              </div>
              <div className="password">
                <Input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                  size="md"
                  variant="flushed"
                />
              </div>
              <div className="cpassword">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  id="cpassword"
                  size="md"
                  name="confirm"
                  required
                  onChange={handleChange}
                  variant="flushed"
                />
              </div>
              <Box
                sx={{ mt: "10px", display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant={"outline"}
                  colorScheme="linkedin"
                  sx={{ p: "10px 30px" }}
                >
                  Sign Up
                </Button>
              </Box>
              <div className="form-input">
                <p>
                  already have an account?
                  <Link
                    onClick={() => setHide(!hide)}
                    style={{ textDecoration: "underline", marginLeft: "5px" }}
                  >
                    Login
                  </Link>
                </p>
                <Link onClick={() => setshow(!show)}>
                  <p style={{ textDecoration: "underline" }}>forget password</p>
                </Link>
              </div>
            </form>
          </div>
          {show && <ForgetPassword setShow={setshow} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
