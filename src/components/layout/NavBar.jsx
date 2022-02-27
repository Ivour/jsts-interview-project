import React from "react";
import styles from "./NavBar.module.css";
import { Button, Typography } from "@mui/material";
import ChipWithMenu from "../utils/ChipWithMenu";
import MediationIcon from "@mui/icons-material/Mediation";

let content;

const NavBar = ({ isSearch }) => {
  if (isSearch) content = <ChipWithMenu />;

  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-bar__logo-container"]}>
        <MediationIcon sx={{ margin: "0.4em" }} color="primary" />
        <Typography>Get Repos App</Typography>
      </div>
      <div className={styles["nav-bar__buttons"]}>{content}</div>
    </nav>
  );
};

export default NavBar;
