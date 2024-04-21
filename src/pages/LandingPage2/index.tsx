import { Typography, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


const LandingPage2 = () => {
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // After the component mounts, set a timeout to enable animation
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  return (
    <div className="p-5 pt-20 text-center">
      <Fade in={animationReady} timeout={500}>
        <div className="landing-page-text">
          <Typography variant="h3">
            The purpose of this website is to guide you through the process of
            building your project. It&apos;s simple: choose the technologies you want to
            use and describe your project idea. A Learning Path will be generated
            for you, providing step-by-step instructions on what you need to learn
            and do in order to bring your idea to life
          </Typography>
        </div>
      </Fade>
      <div className="flex justify-center gap-1 pt-20">
          <Link to={"/learningpath"}>
          <Fade in={animationReady} timeout={500}>
            <button
              className="landing-page-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum group border-black border-2 rounded-l-xl hover:bg-white hover:border-black"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 right-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 mr-9 group-hover:mr-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                View Your Learning Path
              </span>
            </button>
          </Fade>
          </Link>
        <Link to={"/guide"}>
          <Fade in={animationReady} timeout={500}>
            <button
              className="landing-page-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-r-xl"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                Create New Learning Path
              </span>
            </button>
          </Fade>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage2;
