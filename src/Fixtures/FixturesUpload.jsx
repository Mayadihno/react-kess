import {
  Button,
  Card,
  CardBody,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/Config";
import { data } from "./fixturesData";

const FixturesUpload = () => {
  const [category, setCategory] = useState("Choose Sport Category");
  const [fixtures, setFixtures] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const formData = {
    categories: category,
    id: `${Date.now()}`,
    matchFixtures: fixtures,
    timeStamp: serverTimestamp(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setDoc(doc(db, "fixtures", `${Date.now()}`), formData);
    navigate("/fixtures", { replace: true });
    e.target.reset();
  };

  return (
    <React.Fragment>
      <div className="result">
        <Card maxW="sm" className="">
          <CardBody>
            <h3 style={{ textAlign: "center", paddingBottom: "6px" }}>
              Upload Today Fixtures
            </h3>
            <p>Choose sport category</p>
            <form onSubmit={handleSubmit}>
              <Select
                placeholder={category}
                // value={data.sport}
                onChange={handleChange}
                required
              >
                {data &&
                  data.map((data) => {
                    return (
                      <option
                        key={data.id}
                        value={data.sport}
                        // onClick={() => setCategory(data.sport)}
                      >
                        {data.sport}
                      </option>
                    );
                  })}
              </Select>

              <Textarea
                placeholder="Enter Sport Fixtures"
                mt={"20px"}
                required
                value={fixtures}
                onChange={(e) => setFixtures(e.target.value)}
              />
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
                      loadingText="Uploading Fixtures..."
                      colorScheme="twitter"
                      variant="solid"
                      spinnerPlacement="start"
                    >
                      Uploading Fixture...
                    </Button>
                  ) : (
                    <Button type="submit" colorScheme="twitter" variant="solid">
                      <span>Upload Fixture</span>
                    </Button>
                  )}
                </Stack>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default FixturesUpload;
