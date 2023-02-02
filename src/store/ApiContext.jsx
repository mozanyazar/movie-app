import { async } from "@firebase/util";
import { createContext, useContext, useState, useEffect } from "react";

const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const [movieSlider, setMovieSlider] = useState({});

  let apiKey = "51db2db0dbf922780da412df07374cb6";

  const getMovie = async () => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovieSlider(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovie();
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
