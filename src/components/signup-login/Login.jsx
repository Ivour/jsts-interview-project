import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <form className={styles.form}>
      <Typography variant="h5" color="primary">
        Log in
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

        /*  value={email} */
      />

      <Button
        type="submit"
        size="small"
        sx={{ marginTop: "1em" }}
        variant="outlined"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Login;
