import React, { useState } from "react";
import { Typography, TextField, Button, Alert } from "@mui/material";
import styles from "./Signup.module.css";
import { useAuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [hasError, setHasError] = useState(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const passInputHandler = (e) => {
    setPass(e.target.value);
  };
  const passAgainInputHandler = (e) => {
    setPassAgain(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (pass !== passAgain) {
      setHasError("passwords are not the same");
      return;
    }
    try {
      setHasError(false);
      await signup(email, pass);
      navigate("search");
    } catch (err) {
      setHasError(err.message);
    }
  };
  return (
    <>
      {hasError && (
        <Alert
          variant="outlined"
          severity="warning"
          sx={{ marginBottom: "1em" }}
        >
          {hasError}
        </Alert>
      )}
      <form className={styles.form} onSubmit={submitHandler}>
        <Typography variant="h5" color="primary">
          Create account
        </Typography>
        <TextField
          label="Email"
          autoComplete="off"
          variant="outlined"
          size="small"
          onChange={emailInputHandler}
          sx={{ margin: "1em" }}
          value={email}
        />
        <TextField
          label="Password"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="password"
          sx={{ marginBottom: "1em" }}
          onChange={passInputHandler}
          value={pass}
        />
        <TextField
          label="Repeat password"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="password"
          onChange={passAgainInputHandler}
          value={passAgain}
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
    </>
  );
};

export default Signup;
