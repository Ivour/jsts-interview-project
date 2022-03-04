import React, { useState } from "react";
import styles from "./Search.module.css";
import Card from "../utils/Card";
import { Typography, TextField, Button, Alert } from "@mui/material";
import NavBar from "../layout/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";
import ChipWithMenu from "../utils/ChipWithMenu";

const Search = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const inputHandler = (e) => {
    setHasError(false);
    setUsernameInput(e.target.value); // TODO add debouncing
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!usernameInput) {
      setHasError(true);
      return;
    }
    localStorage.removeItem("userData");
    localStorage.removeItem("repos");
    navigate(`/${usernameInput}`);
  };

  return (
    <>
      <NavBar
        showText={true}
        content={
          user ? (
            <ChipWithMenu />
          ) : (
            <Button
              variant="outlined"
              sx={{ marginRight: "0.5em" }}
              size="small"
              onClick={() => navigate("/")}
            >
              Create account
            </Button>
          )
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
      {hasError && (
        <Alert severity="warning" variant="outlined">
          Fill in the username
        </Alert>
      )}
    </>
  );
};

export default Search;
