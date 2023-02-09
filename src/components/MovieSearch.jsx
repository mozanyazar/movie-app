import React, { useState } from "react";
import Lottie from "lottie-react";
import WomanMovie from "../animations/WomanMovie.json";
import WomanMovie2 from "../animations/WomanMovie2.json";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";

const MovieSearch = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { setMessage } = UserAuth();

  const toSearchInnerPage = (ev) => {
    ev.preventDefault();
    if (searchText.trim() !== "") {
      navigate(`searchmovies/${searchText}`);
    } else {
      setMessage({
        isSucces: false,
        message: "please type it!",
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={toSearchInnerPage}
        className="flex items-center mt-10 max-[650px]:flex-col max-[650px]:w-full max-[650px]:my-10"
      >
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="bg-gray-50 border w-[500px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-none max-[650px]:w-[90%] max-[650px]:rounded-sm"
          placeholder="Search Movie"
        ></input>
        <button
          type="submit"
          className=" font-secondaryFont bg-black text-white h-[42px] px-1.5 border border-white box-content border-l-0 rounded-lg rounded-l-none max-[650px]:w-[90%] max-[650px]:rounded-sm max-[650px]:px-0 max-[650px]:bg-slate-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default MovieSearch;
