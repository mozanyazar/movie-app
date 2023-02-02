import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({
    message: undefined,
    isSucces: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const updateProfileSignIn = (name) =>
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });

  const createUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setMessage({
          message: "profile created !",
          isSucces: true,
        });
        updateProfileSignIn(name);
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const SignInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setMessage({
          message: "successful !",
          isSucces: true,
        });
        navigate("/");
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setMessage({
          message: "Logout successful !",
          isSucces: true,
        });
      })
      .catch((error) => {
        setMessage({
          message: error.message,
          isSucces: false,
        });
      });
  };

  const values = {
    createUser,
    logout,
    SignInWithEmail,
    message,
    setMessage,
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={{ ...values }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
