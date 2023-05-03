import React from "react";
import { UserAuth } from "../store/AuthContext";
import headerLogo from "../animations/headerLogo.json";
import Lottie from "lottie-react";
import { WatchListStore } from "../store/WatchListContext";
const WatchListUserExist = () => {
  const { watchList } = UserAuth();
  const { addToWatchedList, removeTheWatchList } = WatchListStore();

  return (
    <div>
      {watchList == null ? (
        <div
          style={{ height: "calc(100vh - 78px)" }}
          className="w-full bg-slate-400 flex items-center justify-center"
        >
          <div className="p-10 bg-slate-700 rounded-full">
            <Lottie
              className="w-[250px] h-auto"
              animationData={headerLogo}
              loop={true}
            />
          </div>
        </div>
      ) : (
        <div
          style={{ minHeight: "calc(100vh - 78px)" }}
          className="bg-slate-200 pt-5"
        >
          <h1 className=" font-secondaryFont shadow-stone-600 w-9/12 mx-auto shadow capitalize text-center text-4xl mb-3 font-semibold text-stone-700 max-[900px]:text-xl">
            Your Watch List
          </h1>
          {watchList.length > 0 ? (
            <div className="flex flex-col ">
              {watchList.map((el) => (
                <div key={el.id}>
                  <div className="flex gap-10 items-start py-3 border-b border-slate-700 max-[1240px]:px-4 max-[780px]:flex-col max-[780px]:items-center">
                    <img
                      className="h-[200px] object-cover max-[780px]:w-[90%] max-[780px]:h-auto "
                      src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                      alt={`${el.title}`}
                    />
                    <div>
                      <h2 className="text-2xl mb-3 font-semibold text-slate-700 uppercase max-[900px]:text-xl">
                        {" "}
                        {el.original_title}{" "}
                      </h2>
                      <p className="text-md text-slate-600  max-[900px]:mb-4 max-[900px]:text-justify max-[900px]:text-sm">
                        {" "}
                        {el.overview}
                      </p>
                      <div className="flex items-center pt-3 justify-end pr-2 gap-6 max-[780px]:gap-2  max-[780px]:justify-start">
                        <button
                          onClick={() => removeTheWatchList(el)}
                          className="bg-gradient-to-r from-red-900 to-red-500 transition-all duration-150 ease-out text-white border-2 border-slate-300  font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105  max-[900px]:text-sm max-[420px]:text-[12px] "
                        >
                          Remove Watch List
                        </button>
                        <button
                          onClick={() => addToWatchedList(el)}
                          className="bg-gradient-to-r from-[#ededed] to-blue-300 transition-all duration-150 ease-out text-slate-900 border-2 border-slate-300  font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105 max-[900px]:text-sm max-[420px]:text-[12px] "
                        >
                          Add Watched List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchListUserExist;
