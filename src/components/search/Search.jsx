import React from "react";
import styles from "./Search.module.css";
import Card from "../utils/Card";
import { Typography, TextField, Button, Alert } from "@mui/material";
import NavBar from "../layout/NavBar";

const Search = () => {
  return (
    <>
      <NavBar isSearch={true} />
      <Card>
        <Typography>lorem ipsum - vymyslet text?</Typography>
      </Card>
      <Card>
        <form className={styles.search}>
          <Typography variant="h5">Get Repos & Orgs</Typography>
          <TextField
            label="Username"
            autoComplete="off"
            variant="outlined"
            sx={{ margin: "1em" }}
            size="small"

            /*  value={email} */
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
