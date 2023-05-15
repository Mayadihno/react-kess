/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/Config";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
export const SignIn = ({ hide, setHide }) => {
  const [formData, setFormData] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setFormData({ ...formData, ...newInput });
  };
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/fixturesRoute", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/wrong-password" || "auth/user-not-found") {
        toast.error("Incorrect Email or Password");
      }
    }
  };
  return (
    <React.Fragment>
      <div className="signin">
        <div className="signIn__background">
          <div className="sign__content">
            <div className="signIn__text">
              <p style={{ textAlign: "center", paddingTop: "5px" }}>
                Sign in with Email and Password
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="email">
                <Input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  size="md"
                  variant="flushed"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="password" style={{ paddingTop: "10px" }}>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  variant="flushed"
                  id="password"
                  size="md"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <Box
                sx={{ mt: "20px", display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant={"outline"}
                  type="submit"
                  colorScheme="linkedin"
                  sx={{ p: "15px 30px" }}
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </div>
          <div className="form-input">
            <p>
              Don't have an account?
              <Link
                onClick={() => setHide(!hide)}
                style={{ textDecoration: "underline", marginLeft: "5px" }}
              >
                create account
              </Link>
            </p>
            <Link onClick={() => setshow(!show)}>
              <p style={{ textDecoration: "underline" }}>Forget Password</p>
            </Link>
          </div>
          {show && <ForgetPassword setShow={setshow} />}
        </div>
      </div>
    </React.Fragment>
  );
};
