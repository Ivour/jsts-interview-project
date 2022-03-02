import React from "react";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import styles from "./RepoItem.module.css";
import {
  Typography,
  Chip,
  Link,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const RepoItem = ({ name, url, description, language, stars }) => {
  return (
    <>
      <div className={styles["repo-item"]}>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ width: "fit-content", fontWeight: "bold" }}
        >
          {
            // TODO add link via props
          }
          {name}
        </Link>
        <Chip
          label="Add to favourites"
          icon={<StarBorderPurple500Icon />}
          variant="outlined"
          size="small"
          className={styles["repo-item__visibility"]}
        />

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

        <Accordion
          variant="outlined"
          className={styles["repo-item__accordion"]}
          sx={{ backgroundColor: "#242424", borderRadius: "1rem" }}
          disableGutters={true}
        >
          <AccordionSummary
            expandIcon={<ArrowCircleDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{description}</Typography>
          </AccordionDetails>
        </Accordion>

        <Typography className={styles["repo-item__language"]}>
          {language}
        </Typography>

        <div className={styles["repo-item__stars-container"]}>
          <StarBorderPurple500Icon />
          <Typography>{stars}</Typography>
        </div>
      </div>
    </>
  );
};

export default RepoItem;
