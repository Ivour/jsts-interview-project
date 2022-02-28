import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import Card from "../utils/Card";
import { Typography, Button, Avatar } from "@mui/material";
import styles from "./AboutUser.module.css";
import UserGridRow from "./UserGridRow";
import { Link } from "react-router-dom";
import NavBar from "../layout/NavBar";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import GitHubIcon from "@mui/icons-material/GitHub";

const data = [{}];

const AboutUser = () => {
  const { username } = useParams();

  const getData = useCallback(async (username) => {
    try {
      const res = await fetch(`${GIT_BASE_URL}/users/${username}`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    getData(username);
  }, [getData, username]);

  return (
    <>
      <NavBar />
      <Card isProfile={true}>
        <section className={styles["about-user"]}>
          <Typography variant="h5" className={styles["about-user__title"]}>
            User Info
          </Typography>
          <Avatar
            alt="Remy Sharp"
            className={styles["about-user__avatar"]}
            variant="rounded"
            /* src={input}  TODO sizes*/ sx={{ border: "1px solid #cffc03" }}
          />
          <UserGridRow
            title={"Username:"}
            value={"Ivour"}
            icon={<AccountCircleIcon />}
          />
          <UserGridRow
            title={"Full name:"}
            value={"Ivo Hli"}
            icon={<BadgeIcon />}
          />
          <UserGridRow
            title={"Bio:"}
            value={"CEO Apple"}
            icon={<FingerprintIcon />}
          />
          <UserGridRow
            title={"Blog:"}
            value={"linkedin.com"}
            icon={<ViewAgendaIcon />}
          />
          <UserGridRow
            title={"Location:"}
            value={"czech + flag"}
            icon={<LocationOnIcon />}
          />
          <UserGridRow
            title={"Followers:"}
            value={765}
            icon={<PersonAddIcon />}
          />
          <UserGridRow
            title={"Created at:"}
            value={"22/Feb/2005"}
            icon={<MoreTimeIcon />}
          />
          <UserGridRow
            title={"Public Repos"}
            value={76}
            icon={<CollectionsBookmarkIcon />}
          />
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
  );
};

export default AboutUser;
