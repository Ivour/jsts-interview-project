import React, { useEffect, useState } from "react";
import RepoItem from "../repos/RepoItem";
import database from "../../config/firebase";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
  onValue,
} from "firebase/database";
import { useAuthContext } from "../../store/auth-context";
import { Button } from "@mui/material";

const Favourites = () => {
  const { user } = useAuthContext();
  const [favRepos, setFavRepos] = useState(null);
  console.log(user);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "favRepos/" + user?.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const a = Object.values(data);
        console.log(a);
        setFavRepos(a);
      }
    });
  }, [user, db]);

  return (
    <>
      {favRepos &&
        favRepos.map((obj, i) => (
          <RepoItem
            name={obj.name}
            key={i}
            url={obj.url}
            stars={obj.stars}
            language={obj.language}
            description={obj.description}
            id={obj.id}
            isFav={true}
          />
        ))}
    </>
  );
};

export default Favourites;
