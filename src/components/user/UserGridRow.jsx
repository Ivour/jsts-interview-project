import React from "react";
import { Typography, Link } from "@mui/material";
import styles from "./UserGridRow.module.css";

const UserGridRow = ({ title, value, icon, link }) => {
  return (
    <>
      <div className={styles["icon-title"]}>
        {icon}
        <Typography sx={{ marginLeft: "0.3em" }}>{title}</Typography>
      </div>

      {!link && (
        <Typography
          sx={{ marginLeft: "2em", justifySelf: "start", fontSize: "110%" }}
          color="primary"
          fontWeight="bold"
        >
          {value}
        </Typography>
      )}
      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: "bold", justifySelf: "start", marginLeft: "2em" }}
        >
          {link}
        </Link>
      )}
    </>
  );
};

export default UserGridRow;
