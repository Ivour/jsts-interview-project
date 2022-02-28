import React from "react";
import { Typography } from "@mui/material";
import styles from "./UserGridRow.module.css";

const UserGridRow = ({ title, value, icon }) => {
  return (
    <>
      <div className={styles["icon-title"]}>
        {icon}
        <Typography sx={{ marginLeft: "0.3em" }}>{title}</Typography>
      </div>

      <Typography
        sx={{ marginLeft: "2em", justifySelf: "start", fontSize: "110%" }}
        color="primary"
        fontWeight="bold"
      >
        {value}
      </Typography>
    </>
  );
};

export default UserGridRow;
