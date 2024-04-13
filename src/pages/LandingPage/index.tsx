import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import CustomCard from "../../components/Cards";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import Image from "../../components/Images";
import { Link } from "react-router-dom";
import Image2 from "../../components/Images/index2";
import Image3 from "../../components/Images/index3";
import { type } from "os";
import { UserContext } from "../../providers/userProvider";

export type CardDataProps = {
  name: string;
  type: string;
  description: string;
  short_description: string;
};

const LandingPage: React.FC = () => {
  const [showPaper, setShowPaper] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cardData, setCardData] = useState<CardDataProps[] | undefined>();
  const myRef = React.useRef<HTMLDivElement>(null);
  const { isLoggedIn } = React.useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:6300/api/v1/technologies");
      const data = await response.json();
      setCardData(data);
    };
    fetchData();
  }, []);

  const [position, setPosition] = useState({
    first: "0%",
    second: "0%",
    third: "0%",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => ({
        first: prevPosition.first === "0%" ? "100%" : "0%", // Toggle between 0% and 100%
        second: prevPosition.second === "0%" ? "-100%" : "0%", // Inverse direction for the second
        third: prevPosition.third === "0%" ? "100%" : "0%", // Toggle between 0% and 100%
      }));
    }, 4000); // Change position every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Extract unique subheaders and create a 'All' category
  const subheaders = useMemo(() => {
    const headers = new Set(cardData?.map((card) => card.type));
    return ["All", ...Array.from(headers)];
  }, [cardData]);

  // Handle tab change
  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setActiveTab(newValue);
  };
  // Filter cards based on selected tab
  const filteredCards = cardData?.filter(
    (card) =>
      subheaders[activeTab] === "All" || card.type === subheaders[activeTab]
  );

  useEffect(() => {
    if (showPaper && myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPaper]);
  const handleSubmit = () => {
    setShowPaper(!showPaper);
  };

  return (
    <div>
      <div className="pt-16">
        <div
          className="flex justify-center text-justify"
          style={{
            transform: `translateX(${position.first})`,
            transition: "transform 1s ease-in-out",
          }}
        >
          <Typography variant="h1">Start planning</Typography>
        </div>
        <div
          className="text-justify flex justify-center"
          style={{
            transform: `translateX(${position.second})`,
            transition: "transform 1s ease-in-out",
            transitionDelay: "1s",
          }}
        >
          <Typography variant="h1">Start learning</Typography>
        </div>
        <div
          className="text-justify flex justify-center"
          style={{
            transform: `translateX(${position.third})`,
            transition: "transform 1s ease-in-out",
            transitionDelay: "2s",
          }}
        >
          <Typography variant="h1">Start creating</Typography>
        </div>
        <div
          className="text-justify flex justify-center"
          style={{
            transform: `translateX(${position.second})`,
            transition: "transform 1s ease-in-out",
            transitionDelay: "3s",
          }}
        >
          <Typography variant="h1">Start developing</Typography>
        </div>
        <div className="flex justify-center pt-10">
          <Link to={isLoggedIn ? "/landingpage" : "/signin"}>
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                Try it out!
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className="pt-10 flex justify-center">
          <Typography variant="body2" className="text-justify">
            Learn more about technologies and tools that can help you bring your
            project to life.
          </Typography>
        </div>
        <div className="pt-10 flex justify-center">
          <a
            href="#_"
            onClick={handleSubmit}
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
              {showPaper ? "Hide Technologies" : "Show Technologies"}
            </span>
          </a>
        </div>
      </div>

      {showPaper && (
        <div className="overflow-auto" ref={myRef}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            {subheaders.map((subheader, index) => (
              <Tab label={subheader} key={index} />
            ))}
          </Tabs>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: { xs: "20px", sm: "30px", md: "50px" },
              background: "#DCDCDC",
              borderRadius: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="">
              <Grid container spacing={0.5}>
                {filteredCards?.map((data, index) => (
                  <Grid item xs={12} sm={6} md={4} key={data.name}>
                    <CustomCard {...data} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                className="pt-9"
                paddingTop={15}
              >
                Ready to dive deeper? Ty our guide creator to bring your project
                to life. It&apos;s quick, easy, and tailored to your needs.
                Start building now!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="pr-12">
                <Image3 />
              </div>
              <div className=" pb-16 pl-20">
                <Link to={"/signin"}>
                  <button
                    type="submit"
                    className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                  >
                    Try it out
                  </button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
