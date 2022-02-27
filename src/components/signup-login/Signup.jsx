import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <form className={styles.form}>
      <Typography variant="h5" color="primary">
        Create account
      </Typography>
      <TextField
        label="Email"
        autoComplete="off"
        variant="outlined"
        size="small"
        sx={{ margin: "1em" }}
        /*  value={email} */
      />
      <TextField
        label="Password"
        autoComplete="off"
        variant="outlined"
        size="small"
        sx={{ marginBottom: "1em" }}

        /*  value={email} */
      />
      <TextField
        label="Repeat password"
        autoComplete="off"
        variant="outlined"
        size="small"
        /*  value={email} */
      />
      <Button
        type="submit"
        size="small"
        sx={{ marginTop: "1em" }}
        variant="outlined"
        color="primary" // TODO pick a secondary color
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
