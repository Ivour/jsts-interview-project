import React from "react";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import styles from "./OrgsItem.module.css";
import {
  Typography,
  Chip,
  Link,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const OrgsItem = ({ name, url, description }) => {
  return (
    <>
      <div className={styles["orgs-item"]}>
        <Link
          href={`https://github.com/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ width: "fit-content", fontWeight: "bold" }}
        >
          {
            // TODO add link via props
          }
          {name}
        </Link>

        {/*  <Tooltip title={description} placement="right">
          <Chip
            label="description"
            variant="outlined"
            size="small"
            className={styles["repo-item__description"]}
          />
        </Tooltip> */}

        {/* <Typography
          className={styles["repo-item__description"]}
          sx={{ color: "#999999" }}
        >
          {description}
        </Typography> */}

        <Typography className={styles["orgs-item__description"]}>
          {description}
        </Typography>

        <Avatar
          alt="Remy Sharp"
          className={styles["orgs-item__avatar"]}
          variant="rounded"
          /* src={input}  TODO sizes*/ sx={{ border: "1px solid #cffc03" }}
        />

        <Typography className={styles["orgs-item__members"]}>
          400 members
        </Typography>

        <Typography className={styles["orgs-item__repos"]}>30 repos</Typography>
      </div>
    </>
  );
};

export default OrgsItem;
