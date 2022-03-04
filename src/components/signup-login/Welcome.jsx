import { Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "../utils/Card";
import Signup from "./Signup";
import Login from "./Login";
import styles from "./Welcome.module.css";
import NavBar from "../layout/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

const Welcome = () => {
  const [loginIsVisible, setLoginIsVisible] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    user && navigate("search");
  }, [user, navigate]);

  const showLoginHandler = () => {
    setLoginIsVisible((prevState) => !prevState);
  };

  const navigateHandler = () => {
    navigate("search");
  };
  return (
    <>
      <NavBar showText={true} />

      <Card>{loginIsVisible ? <Login /> : <Signup />}</Card>

      <Card>
        <div className={styles["welcome__switch-container"]}>
          <Typography>
            {`${loginIsVisible ? "Don't" : "Already"} have an accout?`}
          </Typography>
          <Button
            size="small"
            sx={{ marginLeft: "0.5em" }}
            onClick={showLoginHandler}
          >
            {loginIsVisible ? "Create one" : "Log in"}
          </Button>
        </div>
      </Card>
      <Card>
        <Button variant="outlined" size="small" onClick={navigateHandler}>
          continue without logging in
        </Button>
      </Card>
    </>
  );
};

export default Welcome;
