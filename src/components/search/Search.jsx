import React, { useState } from "react";
import styles from "./Search.module.css";
import Card from "../utils/Card";
import { Typography, TextField, Button, Alert } from "@mui/material";
import NavBar from "../layout/NavBar";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUsernameInput(e.target.value); // TODO add debouncing
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <NavBar
        content={
          <Button variant="outlined" size="small" onClick={() => navigate("/")}>
            Create account
          </Button>
        }
      />

      <Card>
        <form className={styles.search} onSubmit={submitHandler}>
          <Typography variant="h5">Get Repos & Orgs</Typography>
          <TextField
            label="Username"
            autoComplete="off"
            variant="outlined"
            sx={{ margin: "1em" }}
            size="small"
            onChange={inputHandler}
            value={usernameInput}
          />

          <Button type="submit" size="small" variant="outlined">
            Get data
          </Button>
        </form>
      </Card>
      <Card>
        <Alert
          variant="outlined"
          severity="error"
          sx={{ borderRadius: "1rem" }}
        >
          alert message - programaticaly
        </Alert>
      </Card>
    </>
  );
};

export default Search;
