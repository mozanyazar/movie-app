import { createContext, useContext, useState, useEffect } from "react";
import { UserAuth } from "./AuthContext";
const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const [movieSlider, setMovieSlider] = useState({});
  const [sliderLoading, setSliderLoading] = useState(false);
  let apiKey = "43eab74a0e3371f45b9f10216d3d2a40";

  const sliderMovieData = async () => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovieSlider(data.results);
      setSliderLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (movieSlider.length > 0) return;
    else {
      sliderMovieData();
    }
  }, []);
  const values = {
    movieSlider,
    sliderLoading,
    setSliderLoading,
  };

  return (
    <ApiContext.Provider value={{ ...values }}>{children}</ApiContext.Provider>
  );
};

export const ApiStore = () => {
  return useContext(ApiContext);
};
