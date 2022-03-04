/* /* import React, { useCallback } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import { Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom"; */

import React, { useState, useEffect } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import RepoItem from "./RepoItem";
import {
  Typography,
  Button,
  Pagination,
  LinearProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL, REPOS_PER_PAGE } from "../../config/constants";
import ChipWithMenu from "../utils/ChipWithMenu";
import { Link } from "react-router-dom";
import { stringToLowerCase } from "../../helpers/functions";

const Repos = () => {
  const [repos, setRepos] = useState(
    JSON.parse(localStorage.getItem("repos")) || []
  );
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const { username } = useParams();

  const pagiChangeHandler = (e, value) => {
    setPage(value);
  };

  const fetchRepos = async (username) => {
    try {
      localStorage.removeItem("repos");
      setIsLoading(true);
      setHasError(false);
      const res = await fetch(
        `${GIT_BASE_URL}/users/${username}/repos?per_page=250`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(`User ${data.message}` || "fetch failed");
      localStorage.setItem("repos", JSON.stringify(data));
      setRepos(data);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (err) {
      setHasError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const repo = JSON.parse(localStorage.getItem("repos")) || [];
    if (repo.length === 0) {
      fetchRepos(username);
    } else {
      const owner = repo[0].owner?.login;
      const ownerLowerCase = stringToLowerCase(owner);

      if (username !== ownerLowerCase) fetchRepos(username);
    }
  }, [username]);

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
              to={`/${username}`}
            >
              back
            </Button>
            <ChipWithMenu />
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

      {!hasError && (
        <Typography variant="h5" className={styles["repos__title"]}>
          {`${username}'s`} Repositories
        </Typography>
      )}

      {repos.length > 0 && !hasError && (
        <>
          {repos
            .slice(
              page * REPOS_PER_PAGE - REPOS_PER_PAGE,
              page * REPOS_PER_PAGE
            )
            .map((obj, i) => (
              <RepoItem
                key={i}
                name={obj.name}
                url={obj.html_url}
                description={obj.description}
                stars={obj.stargazers_count}
                language={obj.language}
              />
            ))}
          {repos.length > REPOS_PER_PAGE && (
            <Pagination
              count={Math.ceil(repos.length / REPOS_PER_PAGE)}
              variant="outlined"
              shape="rounded"
              color="primary"
              sx={{ margin: "auto", width: "fit-content" }}
              onChange={pagiChangeHandler}
            />
          )}
        </>
      )}
      {repos.length === 0 && !hasError && isLoaded && (
        <Typography>nothing to show</Typography>
      )}
    </>
  );
};

export default Repos;
