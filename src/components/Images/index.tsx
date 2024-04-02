import React from "react";
import ImageSvg from "./image.svg";
import exp from "constants";

const Image = () => {

    return (
        <div className="flex justify-center">
        <img src={ImageSvg} alt="Image2" className="w-screen object-cover" />
    </div>
    );

};

export default Image;
    