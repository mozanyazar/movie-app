import React from "react";
import Lottie from "lottie-react";
import LoadAnimatin from "../animations/LoadAnimation.json";
const LoadingAnimation = () => {
  return (
    <div className="animation-wrapper flex items-center justify-center">
      <Lottie
        className="w-[300px] h-auto flex justify-center items-center"
        animationData={LoadAnimatin}
        loop={true}
      />
    </div>
  );
};

export default LoadingAnimation;
