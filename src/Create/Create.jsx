import React, { useState } from "react";
import "./Create.css";
import { Button, Card, CardBody, Divider } from "@chakra-ui/react";
import PhoneAuth from "../Auth/PhoneAuth/PhoneAuth";
import Googles from "../Auth/Google/Googles";
import { FcPhoneAndroid } from "react-icons/fc";
import { SignIn } from "../Auth/Signin/SignIn";
import SignUp from "../Auth/Signup/SignUp";
const Create = () => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);

  return (
    <React.Fragment>
      <div className="create">
        <div className="create__content">
          <Card maxW={"md"}>
            <CardBody>
              <div className="create-body">
                <Button
                  variant={"outline"}
                  colorScheme="twitter"
                  onClick={() => setShow(!show)}
                >
                  <i>
                    <FcPhoneAndroid fontSize={35} />
                  </i>
                  Phone
                </Button>
                <Googles />
              </div>
              <div className="divider">
                <Divider /> OR <Divider />
              </div>
              {show && <PhoneAuth />}
              <div className="create__signUp">
                {hide ? (
                  <SignIn hide={hide} setHide={setHide} />
                ) : (
                  <SignUp hide={hide} setHide={setHide} />
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create;
