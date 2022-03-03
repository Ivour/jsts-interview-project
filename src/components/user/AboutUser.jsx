import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import Card from "../utils/Card";
import { Typography, Button, Avatar, Alert } from "@mui/material";
import styles from "./AboutUser.module.css";
import UserGridRow from "./UserGridRow";
import { Link } from "react-router-dom";
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
  name: ["Full name", <BadgeIcon />],
  blog: ["Blog", <ViewAgendaIcon />],
  bio: ["Bio", <FingerprintIcon />],
  location: ["Location", <LocationOnIcon />],
  public_repos: ["Repos", <CollectionsBookmarkIcon />],
  followers: ["Followers", <PersonAddIcon />],
  created_at: ["Created at", <MoreTimeIcon />],
};

const AboutUser = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getData = useCallback(async (username) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch(`${GIT_BASE_URL}/users/${username}`);
      if (!res.ok) throw new Error("fetching failed, try again");
      const data = await res.json();
      setIsLoading(false);
      setUserData(data);
    } catch (err) {
      setIsLoading(false);
      setHasError(err.message);
    }
  }, []);

  useEffect(() => {
    getData(username);
  }, [getData, username]);

  return (
    <>
      <NavBar
        content={
          <Button
            variant="outlined"
            size="small"
            component={Link}
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

                return (
                  <UserGridRow
                    key={i}
                    title={updatedTitles[key][0]}
                    value={userData[key]}
                    icon={updatedTitles[key][1]}
                  />
                );
              })}
            </section>
          </Card>
          <Card>
            <Button variant="outlined">
              Link to gitHub{" "}
              <GitHubIcon sx={{ color: "white", marginLeft: "0.5em" }} />
            </Button>
          </Card>
          <Card>
            <div className={styles["about-user__buttons"]}>
              <Button variant="outlined" component={Link} to="repos">
                Repos
              </Button>
              <Button variant="outlined" component={Link} to="orgs">
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
