import React from "react";
import LogoSvg from "./logo.svg";
import exp from "constants";

const Logo = () => {

    return (
        <div className="flex justify-center">
            <img src={LogoSvg} alt="Logo" className="w-8 h-8" />
        </div>
    );

};

export default Logo;
    