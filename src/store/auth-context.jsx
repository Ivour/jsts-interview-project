import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
//import { auth } from "../config/firebase";

const AuthContext = createContext({
  signUp: () => {},
  logIn: () => {},
  signout: () => {},
  updateProfile: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  function signUp(email, password) {
    // return createUserWithEmailAndPassword(auth, email, password);
  }
  const logIn = (email, password) => {
    // return signInWithEmailAndPassword(auth, email, password);
  };
  const signout = () => {
    //  return signOut(auth);
  };
  const addUsername = (username) => {
    //  return updateProfile(auth.currentUser, { displayName: username });
  };
  const changePassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

  /*  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
 */
  return (
    <AuthContext.Provider
      value={{ signUp, logIn, user, signout, addUsername, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
