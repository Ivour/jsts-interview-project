import React, { useState } from "react";
import NavBar from "../layout/NavBar";
import OrgsItem from "./OrgsItem";
import { Typography, Button, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { GIT_BASE_URL } from "../../config/constants";
import ChipWithMenu from "../utils/ChipWithMenu";

const Orgs = () => {
  const [orgs, setOrgs] = useState([]);
  const params = useParams();
  const fetchtry = async () => {
    const res = await fetch(`${GIT_BASE_URL}/users/${params.username}/orgs`);
    const data = await res.json();

    const updatedData = await Promise.all(
      data.map(async (obj) => {
        const membersRes = await fetch(
          `https://api.github.com/orgs/${obj.login}/public_members`
        );
        const membersData = await membersRes.json();

        const reposRes = await fetch(
          `https://api.github.com/orgs/${obj.login}/repos`
        );
        const reposData = await reposRes.json();
        return { ...obj, members: membersData.length, repos: reposData.length };
      })
    );

    setOrgs(updatedData);

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
    </>
  );
};

export default Orgs;
