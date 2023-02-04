import { createContext, useContext, useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";
const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const [movieSlider, setMovieSlider] = useState({});
  let apiKey = "51db2db0dbf922780da412df07374cb6";

  const sliderMovieData = async () => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovieSlider(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (movieSlider.length > 0) return;
    else {
      getMovie();
    }
  }, []);
  const values = {
    movieSlider,
  };

  return (
    <ApiContext.Provider value={{ ...values }}>{children}</ApiContext.Provider>
  );
};

export const ApiStore = () => {
  return useContext(ApiContext);
};
