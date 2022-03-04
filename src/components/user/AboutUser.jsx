import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import Card from "../utils/Card";
import {
  Typography,
  Button,
  Avatar,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import styles from "./AboutUser.module.css";
import UserGridRow from "./UserGridRow";
import { Link as RouterLink } from "react-router-dom";
import NavBar from "../layout/NavBar";
import LinearProgress from "@mui/material/LinearProgress";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import GitHubIcon from "@mui/icons-material/GitHub";

const updatedTitles = {
  login: ["Login", <AccountCircleIcon />],
  
  blog: ["Blog", <ViewAgendaIcon />],
  bio: ["Bio", <FingerprintIcon />],
  location: ["Location", <LocationOnIcon />],
  public_repos: ["Repos", <CollectionsBookmarkIcon />],
  followers: ["Followers", <PersonAddIcon />],
  created_at: ["Created at", <MoreTimeIcon />],
};

const AboutUser = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getData = useCallback(async (username) => {
    setIsLoading(true);
    setHasError(false);
    try {
      localStorage.removeItem("userData");
      const res = await fetch(`${GIT_BASE_URL}/users/${username}`);
      const data = await res.json();

      //if (!res.ok) throw new Error("fetch failed");
      if (data.message === "Not Found") throw new Error(`User ${data.message}`);

      localStorage.setItem("userData", JSON.stringify(data));
      setIsLoading(false);
      setUserData(data);
    } catch (err) {
      setIsLoading(false);
      setHasError(err.message);
    }
  }, []);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("userData"))?.login || "";
    const loginToLower = [...login]
      .map((v) => {
        if (typeof v === "string") return v.toLowerCase();
        return v;
      })
      .join("");
    if (loginToLower !== username) {
      getData(username);
    }
  }, [getData, username]);

  return (
    <>
      <NavBar
        content={
          <Button
            variant="outlined"
            size="small"
            component={RouterLink}
            to={"/search"}
          >
            search
          </Button>
        }
      />
      {isLoading && <LinearProgress color="primary" />}

      {hasError && (
        <Alert
          severity="error"
          variant="outlined"
          sx={{ width: "80%", margin: "2em auto" }}
        >
          {hasError}
        </Alert>
      )}

      {!isLoading && !hasError && userData && (
        <>
          <Card isProfile={true}>
            <section className={styles["about-user"]}>
              <Typography variant="h5" className={styles["about-user__title"]}>
                {userData.name ?? "User Info"}
              </Typography>
              <Avatar
                alt={userData.name}
                className={styles["about-user__avatar"]}
                variant="rounded"
                src={userData.avatar_url}
                /*  TODO sizes*/ sx={{
                  border: "1px solid #3feb9a",
                }}
              />
              {Object.keys(updatedTitles).map((key, i) => {
                if (!userData[key]) return null;

                let updatedContent = null;
                if (key === "created_at") {
                  updatedContent = userData[key].slice(0, 4);
                }

                return (
                  <UserGridRow
                    key={i}
                    title={updatedTitles[key][0]}
                    value={updatedContent ?? userData[key]}
                    icon={updatedTitles[key][1]}
                    link={key === "blog" ? userData[key] : false}
                  />
                );
              })}
            </section>
          </Card>
          <Card>
            <Button variant="outlined">
              <MuiLink
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ width: "fit-content", fontWeight: "bold" }}
              >
                Link to github
              </MuiLink>
              <GitHubIcon sx={{ color: "white", marginLeft: "0.5em" }} />
            </Button>
          </Card>
          <Card>
            <div className={styles["about-user__buttons"]}>
              <Button variant="outlined" component={RouterLink} to="repos">
                Repos
              </Button>
              <Button variant="outlined" component={RouterLink} to="orgs">
                Orgs
              </Button>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default AboutUser;
