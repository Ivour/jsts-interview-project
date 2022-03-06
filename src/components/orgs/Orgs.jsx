import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../layout/NavBar";
import OrgsItem from "./OrgsItem";
import { Typography, Button, LinearProgress, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import ChipWithMenu from "../utils/ChipWithMenu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

const Orgs = () => {
  const [orgs, setOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuthContext();

  const { username } = useParams();
  const fetchtry = useCallback(async (username) => {
    try {
      setHasError(false);
      setIsLoading(true);
      const res = await fetch(`${GIT_BASE_URL}/users/${username}/orgs`);
      const data = await res.json();

      if (!res.ok) throw new Error(`User ${data.message}` || "fetch failed");

      const updatedData = await Promise.all(
        data.map(async (obj) => {
          const membersRes = await fetch(
            `https://api.github.com/orgs/${obj.login}/public_members`
          );
          if (!membersRes.ok) throw new Error("fetch failed");

          const membersData = await membersRes.json();

          const reposRes = await fetch(
            `https://api.github.com/orgs/${obj.login}/repos`
          );
          if (!reposRes.ok) throw new Error("fetch failed");
          const reposData = await reposRes.json();

          return {
            ...obj,
            members: membersData.length,
            repos: reposData.length,
          };
        })
      );
      setIsLoaded(true);
      setIsLoading(false);
      setOrgs(updatedData);
    } catch (err) {
      setIsLoading(false);
      setHasError(err.message);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    fetchtry(username);
  }, [fetchtry, username]);

  return (
    <>
      <NavBar
        content={
          <>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              component={Link}
              sx={{ marginRight: "1em" }}
              to={`/${username}`}
            >
              back
            </Button>
            {user && <ChipWithMenu />}
          </>
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
      {!hasError && !isLoading && isLoaded && (
        <Typography
          variant="h5"
          sx={{ paddingTop: "1em", textAlign: "center" }}
        >
          {`${username}'s`} Organisations
        </Typography>
      )}
      {orgs.map((obj, i) => (
        <OrgsItem
          key={i}
          name={obj.login}
          avatar={obj.avatar_url}
          description={obj.description}
          members={obj.members}
          repos={obj.repos}
        />
      ))}
      {orgs.length === 0 && !hasError && isLoaded && (
        <Alert severity="warning" variant="outlined" sx={{ marginTop: "1em" }}>
          no organisations
        </Alert>
      )}
    </>
  );
};

export default Orgs;
