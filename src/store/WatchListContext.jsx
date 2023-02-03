import { createContext, useContext, useState, useEffect } from "react";
import { UserAuth } from "./AuthContext";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
  const { user, setMessage } = UserAuth();

  const addWatchList = async (movie) => {
    try {
      const userWatchList = doc(db, "posts", user.uid);
      await updateDoc(userWatchList, {
        watchList: arrayUnion({
          ...movie,
        }),
      });
      setMessage({
        message: "movie added!",
        isSucces: true,
      });
    } catch (e) {
      setMessage({
        message: "Error, try again!",
        isSucces: false,
      });
    }
  };

  const WatchListHandler = (movie) => {
    if (!user) {
      setMessage({
        message: "please login!",
        isSucces: false,
      });
    } else if (user) {
      addWatchList(movie);
    }
  };

  const values = {
    WatchListHandler,
  };

  return (
    <WatchListContext.Provider value={{ ...values }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const WatchListStore = () => {
  return useContext(WatchListContext);
};
