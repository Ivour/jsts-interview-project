import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext({
  signup: () => {},
  login: () => {},
  signout: () => {},
  changePassword: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signout = () => {
    return signOut(auth);
  };

  const changePassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, login, user, signout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
