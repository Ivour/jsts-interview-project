import React from "react";

import styles from "./OrgsItem.module.css";
import { Typography, Chip, Link, Avatar } from "@mui/material";

const OrgsItem = ({ name, members, description, avatar, repos }) => {
  return (
    <>
      <div className={styles["orgs-item"]}>
        <Link
          href={`https://github.com/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ width: "fit-content", fontWeight: "bold" }}
        >
          {name}
        </Link>

        <Typography className={styles["orgs-item__description"]}>
          {description}
        </Typography>

        <Avatar
          alt={name}
          className={styles["orgs-item__avatar"]}
          variant="rounded"
          src={avatar}
          /*  TODO sizes */ sx={{ border: "1px solid #3feb9a" }}
        />

        <Typography className={styles["orgs-item__members"]}>
          {members} members
        </Typography>

        <Typography className={styles["orgs-item__repos"]}>
          {repos} repos
        </Typography>
      </div>
    </>
  );
};

export default OrgsItem;
