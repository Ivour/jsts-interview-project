import React from "react";
import styles from "./Search.module.css";
import Card from "../utils/Card";
import { Typography } from "@mui/material";
import NavBar from "../layout/NavBar";

const Search = () => {
  return (
    <>
      <NavBar isSearch={true} />
      <Card>
        <Typography>lorem ipsum - vymyslet text?</Typography>
      </Card>
    </>
  );
};

export default Search;
