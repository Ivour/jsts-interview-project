import { Typography, Button } from "@mui/material";
import React from "react";
import Card from "../utils/Card";
import Signup from "./Signup";
import Login from "./Login";
import styles from "./Welcome.module.css";
import NavBar from "../layout/NavBar";

const Welcome = () => {
  return (
    <>
      <NavBar />
      <Card>
        <Signup />
      </Card>
      <Card>
        <Login />
      </Card>
      <Card>
        <div className={styles["welcome__switch-container"]}>
          <Typography>Don't have an accout?</Typography>
          <Button variant="outlined" size="small" sx={{ marginLeft: "0.5em" }}>
            create account
          </Button>
        </div>
      </Card>
      <Card>
        <Button variant="outlined" size="small">
          Continue without logging in
        </Button>
      </Card>
    </>
  );
};

export default Welcome;
