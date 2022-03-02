/* /* import React, { useCallback } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import { Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom"; */

import React, { useState } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import RepoItem from "./RepoItem";
import { Typography, Button, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import ChipWithMenu from "../utils/ChipWithMenu";

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const params = useParams();
  const fetchtry = async () => {
    const res = await fetch(
      `${GIT_BASE_URL}/users/${params.username}/repos?per_page=250`
    );
    const data = await res.json();
    setRepos(data);
    console.log(data);
  };
  return (
    <>
      <NavBar
        contenttest={
          <>
            <Button size="small" color="primary" variant="outlined">
              try
            </Button>
            <ChipWithMenu />
          </>
        }
      />
      <button onClick={fetchtry}>click me</button>
      <Typography variant="h5" className={styles["repos__title"]}>
        {`${params.username}'s`} Repositories
      </Typography>
      {repos.map((obj, i) => (
        <RepoItem
          key={i}
          name={obj.name}
          url={obj.html_url}
          description={obj.description}
          stars={obj.stargazers_count}
          language={obj.language}
        />
      ))}
      <Pagination count={10} variant="outlined" color="primary" />
    </>
  );
};

export default Repos;

/* const Repos = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const BASE_URL = "https://api.github.com";

  const getUserData = useCallback((username) => {
    return axios
      .all([
        axios.get(`${BASE_URL}/users/${username}`),
        axios.get(`${BASE_URL}/users/${username}/orgs`),
      ])
      .then(([user, orgs]) => {
        console.log({
          user: user.data,
          orgs: orgs.data,
        });
        setInput(user.data.avatar_url);
      });
  }, []);
  const gethandler = useCallback(async (username) => {
    const BASE_URL = "https://api.github.com";
    const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.message === "Not Found") throw new Error("user does not exist"); //tohle funguje!
      console.log(data);
      //když vrátí [], tak user nemá žádná repa
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    gethandler(params.username);
    getUserData(params.username);
  }, [params.username, getUserData, gethandler]);

  return (
    <>
      <NavBar isRepos={true} />
      <input type="text" onChange={(e) => setInput(e.target.value)}></input>
      <Button onClick={gethandler}>get repos</Button>
      <Button onClick={getUserData}>get user data</Button>
      <Avatar alt="Remy Sharp" src={input} />
    </>
  );
};

export default Repos;
 */
