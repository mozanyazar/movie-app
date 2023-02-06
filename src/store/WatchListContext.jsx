import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserAuth } from "./AuthContext";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
  const { user, setMessage, setWatchList, watchList } = UserAuth();

  const addWatchList = async (movie) => {
    try {
      const userWatchList = doc(db, "posts", user.uid);
      await updateDoc(userWatchList, {
        watchList: arrayUnion({
          ...movie,
        }),
      }).then(() => {
        setWatchList((prev) => [...prev, movie]);
        setMessage({
          message: "succesfull!",
          isSucces: true,
        });
      });
    } catch (e) {
      setMessage({
        message: "Error, try again!",
        isSucces: false,
      });
    }
  };

  const addWatchListController = async (movie) => {
    if (watchList.length == 0) {
      addWatchList(movie);
    } else if (watchList.length > 0) {
      const checkMovieExist = watchList.find((e) => e.id === movie.id);
      if (checkMovieExist == undefined) {
        return addWatchList(movie);
      } else if (checkMovieExist !== undefined) {
        setMessage({
          isSucces: false,
          message: "Already exist! ",
        });
      }
    }
  };

  const WatchListHandler = (movie) => {
    if (!user) {
      setMessage({
        message: "please login!",
        isSucces: false,
      });
    } else if (user) {
      addWatchListController(movie);
    }
  };

  const values = {
    WatchListHandler,
    watchList,
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
