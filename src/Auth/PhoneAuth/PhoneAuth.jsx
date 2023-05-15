import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import React, { useState } from "react";
import "./PhoneAuth.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Send Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === "auth/invalid-phone-number") {
          toast.error("Invalid Phone Number");
        }
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.code);
        setLoading(false);
      });
  }
  if (user) {
    navigate("/fixturesRoute", { replace: true });
    toast.success("You Have Login Successfully");
  }

  return (
    <React.Fragment>
      <div className="phone">
        <div id="recaptcha-container" className="recaptcha-container"></div>
        {!user && (
          <div className="phone__content">
            {!showOTP ? (
              <Card maxW="md" className="card-otp card__bg">
                <CardBody>
                  <h3>Sign In with UK phone Number</h3>
                  <div className="icons"></div>
                  <div className="phone__input">
                    <PhoneInput
                      country="gb"
                      enableAreaCodes={true}
                      onlyCountries={["gb"]}
                      preserveOrder={["onlyCountries", "preferredCountries"]}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </div>
                  <div className="button">
                    <Stack
                      align="center"
                      padding={"20px 0px"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      {loading ? (
                        <Button
                          isLoading
                          loadingText=" Sending Code Via SMS"
                          colorScheme="teal"
                          variant="outline"
                          spinnerPlacement="start"
                        >
                          Sending Code...
                        </Button>
                      ) : (
                        <Button
                          onClick={onSignup}
                          colorScheme="twitter"
                          variant="solid"
                        >
                          <span>Get Code</span>
                        </Button>
                      )}
                    </Stack>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <div className="phone__otp">
                <Card maxW="md" className="card-otp card__bg">
                  <CardBody>
                    <h3>welcome back User</h3>
                    <div className="icons"></div>
                    <div className="label">Input Recieve OTP Here</div>
                    <div className="otp">
                      <OtpInput
                        OTPLength={6}
                        otpType="number"
                        value={otp}
                        onChange={setOtp}
                        disabled={false}
                        autofocus
                        className="otp-container"
                      ></OtpInput>
                    </div>
                    <div className="button">
                      <Stack
                        align="center"
                        padding={"20px 0px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        {loading ? (
                          <Button
                            isLoading
                            loadingText="Verifying OTP..."
                            colorScheme="twitter"
                            variant="outline"
                            spinnerPlacement="start"
                          >
                            Verifying OTP
                          </Button>
                        ) : (
                          <Button
                            onClick={onOTPVerify}
                            colorScheme="twitter"
                            variant="outline"
                          >
                            <span>Verify OTP</span>
                          </Button>
                        )}
                      </Stack>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PhoneAuth;
