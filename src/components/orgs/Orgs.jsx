import React, { useState } from "react";
import NavBar from "../layout/NavBar";
import OrgsItem from "./OrgsItem";
import { Typography, Button, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import ChipWithMenu from "../utils/ChipWithMenu";

const Orgs = () => {
  const [repos, setRepos] = useState([]);
  const params = useParams();
  const fetchtry = async () => {
    const res = await fetch(`${GIT_BASE_URL}/users/${params.username}/orgs`);
    const data = await res.json();
    setRepos(data);
    console.log(data);

    //repos?per_page=250
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
      <Typography variant="h5">
        {`${params.username}'s`} Organisations
      </Typography>
      {repos.map((obj, i) => (
        <OrgsItem
          key={i}
          name={obj.login}
          url={obj.html_url}
          description={obj.description}
        />
      ))}
      <Pagination count={10} variant="outlined" color="primary" />
    </>
  );
};

export default Orgs;
