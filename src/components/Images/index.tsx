import React from "react";
import ImageSvg from "./image.svg";
import exp from "constants";

const Image = () => {

    return (
        <div className="flex justify-center">
        <img src={ImageSvg} alt="Image2" style={{ opacity: 0.5 }} className="w-screen object-cover rounded-full border-4 border-costum" />
    </div>
    );

};

export default Image;
    