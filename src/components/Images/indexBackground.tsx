import React from "react";
import BackgroundImage from "./background.svg";

const Background = () => {
  return (
    <div className="relative w-full h-full">
      <img src={BackgroundImage} alt="Decorative background" className="w-full h-full object-cover" />
    </div>
  );
};

export default Background;
