import React, { useState, useMemo } from "react";
import { Typography, TextField, Button, Alert } from "@mui/material";
import styles from "./Login.module.css";
import { useAuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hasError, setHasError] = useState(false);
  const { login } = useAuthContext();
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
  const debouncePassHandler = useMemo(
    () => debounce(passInputHandler, 300),
    []
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setHasError(false);
      if (!email) throw new Error("fill the email");
      if (!pass) throw new Error("fill the password");

      await login(email, pass);
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
          Log in
        </Typography>
        <TextField
          label="Email"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="email"
          sx={{ margin: "1em" }}
          onChange={debounceEmailInputHandler}
        />
        <TextField
          label="Password"
          autoComplete="off"
          variant="outlined"
          size="small"
          type="password"
          onChange={debouncePassHandler}
        />

        <Button
          type="submit"
          size="small"
          sx={{ marginTop: "1em" }}
          variant="outlined"
        >
          Log in
        </Button>
      </form>
    </>
  );
};

export default Login;
