import React, { useCallback } from "react";
import NavBar from "../layout/NavBar";
import styles from "./Repos.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Repos = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const BASE_URL = "https://api.github.com";

  function getUserData(username) {
    return axios
      .all([
        axios.get(`${BASE_URL}/users/${input}`),
        axios.get(`${BASE_URL}/users/${input}/orgs`),
      ])
      .then(([user, orgs]) =>
        console.log({
          user: user.data,
          orgs: orgs.data,
        })
      );
  }
  const gethandler = useCallback(async (username) => {
    const BASE_URL = "https://api.github.com";
    const url = `${BASE_URL}/users/${params.username}/repos?per_page=250`;
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
  }, [params.username, gethandler]);

  return (
    <>
      <NavBar isRepos={true} />
      <input type="text" onChange={(e) => setInput(e.target.value)}></input>
      <Button onClick={gethandler}>get repos</Button>
      <Button onClick={getUserData}>get user data</Button>
    </>
  );
};

export default Repos;
