import React from "react";
import LoadingAnimation from "../components/LoadingAnimation";

const NotFound = () => {
  return (
    <div className="relative">
      <h1 className=" font-primaryFont text-4xl absolute left-1/2 translate-x-[-50%] top-14 p-2 px-5 bg-white rounded-2xl max-[600px]:px-3 max-[600px]:text-[22px]">
        Page Not Found
      </h1>
      <LoadingAnimation />
    </div>
  );
};

export default NotFound;
