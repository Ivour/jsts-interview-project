import { createContext, useContext, useState, useEffect } from "react";

const ReposContext = createContext({
  signUp: () => {},
  logIn: () => {},
  signout: () => {},
  updateProfile: () => {},
});

export const ReposContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  function signUp() {}
  return (
    <ReposContext.Provider value={{ signUp }}>{children}</ReposContext.Provider>
  );
};

export const useReposContext = () => {
  return useContext(ReposContext);
};
