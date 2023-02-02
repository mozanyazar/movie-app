import React from "react";
import Lottie from "lottie-react";
import WomanMovie from "../animations/WomanMovie.json";
const MovieSearch = () => {
  return (
    <div className=" max-w-[900px] mx-auto px-10 py-6 box-border bg-slate-400 h-[400px] mt-5 rounded-[40px] bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex items-center gap-2 flex-col">
        <h2 className="search-slogan font-primaryFont">
          Find Movies and talk to people about that
        </h2>
        <div className="flex justify-around">
          <div className="flex flex-col self-center  items-start">
            <input
              placeholder="search movie"
              className="w-[330px] h-10 px-4 py-1 text-black placeholder-indigo-900 bg-transparent border-2 border-slate-300 rounded-lg placeholder:font-primaryFont placeholder:text-lg"
              type="text"
            />

            <button className="bg-gradient-to-r from-[#825d90]  to-[#20002c]  px-4 py-1 rounded-xl text-slate-200 font-primaryFont  text-lg min-w-[120px] hover:opacity-80 self-end mt-2 hover:text-slate-300 transition-all duration-300 ease-out tracking-wide">
              Search
            </button>
          </div>
          <Lottie
            className="w-[362px] h-auto relative bottom-7 left-14"
            animationData={WomanMovie}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
