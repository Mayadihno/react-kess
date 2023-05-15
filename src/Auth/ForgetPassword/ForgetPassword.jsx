/* eslint-disable react/prop-types */
import { Box, Button, Divider, Input } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/Config";
import "./Forget.css";
const ForgetPassword = ({ setShow }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const newInput = { [e.target.name]: e.target.value };
    setFormData({ ...formData, ...newInput });
  };
  const { email } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Password Link has been sent to Your Email");
      setShow(false);
      navigate("/ceate-account", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User Not Found");
      }
    }
  };
  return (
    <React.Fragment>
      <div className="forget">
        <Divider />
        <div className="forget__content">
          <div className="forget__flex">
            <div className="forget__form">
              <h1>Forget Password</h1>
              <h3>Enter your registed Email Here</h3>
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  required
                  variant="flushed"
                  placeholder="Enter Registerd Email"
                  name="email"
                  onChange={handleChange}
                />
                <Box sx={{ mt: "20px", mb: "10px" }}>
                  <Button
                    type="submit"
                    variant={"outline"}
                    colorScheme={"twitter"}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgetPassword;
