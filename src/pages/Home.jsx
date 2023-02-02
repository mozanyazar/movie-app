import React from "react";
import { UserAuth } from "../store/AuthContext";
import MovieSearch from "../components/MovieSearch";
import Slider from "../components/Slider";
const Home = () => {
  const { user } = UserAuth();
  return (
    <div className=" max-w-[1240px] mx-auto">
      <MovieSearch />
      <Slider />
    </div>
  );
};

export default Home;
