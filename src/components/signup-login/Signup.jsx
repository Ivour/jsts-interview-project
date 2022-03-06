import React, { useState, useMemo } from "react";
import { Typography, TextField, Button, Alert } from "@mui/material";
import styles from "./Signup.module.css";
import { useAuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

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
  const debounceEmailInputHandler = useMemo(
    () => debounce(emailInputHandler, 300),
    []
  );

  const passInputHandler = (e) => {
    setPass(e.target.value);
  };
  const debouncePassInputHandler = useMemo(
    () => debounce(passInputHandler, 300),
    []
  );
  const passAgainInputHandler = (e) => {
    setPassAgain(e.target.value);
  };
  const debouncePassAgainInputHandler = useMemo(
    () => debounce(passAgainInputHandler, 300),
    []
  );

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
          onChange={debounceEmailInputHandler}
          sx={{ margin: "1em" }}
        />
        <TextField
          label="Password"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="password"
          sx={{ marginBottom: "1em" }}
          onChange={debouncePassInputHandler}
        />
        <TextField
          label="Repeat password"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="password"
          onChange={debouncePassAgainInputHandler}
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
