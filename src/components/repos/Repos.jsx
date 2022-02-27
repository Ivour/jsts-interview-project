import React, { useCallback } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import { Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Repos = () => {
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
