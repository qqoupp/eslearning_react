import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import CustomCard from "../../components/Cards";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import Image from "../../components/Images";
import { Link } from "react-router-dom";
import Image2 from "../../components/Images/index2";
import Image3 from "../../components/Images/index3";
import { type } from "os";

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

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("http://localhost:6300/api/v1/technologies");
      const data = await response.json();
      setCardData(data);
    };
    fetchData();

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
      subheaders[activeTab] === "All" ||
      card.type === subheaders[activeTab]
  );

  return (
    <div>
      <Grid container spacing={4} paddingTop={10}>
        <Grid item xs={7}>
          <Typography variant="h5" className="pt-12 text-justify">
            Welcome to E.S.L., your hub for navigating the modern landscape of
            web development technologies. Our mission is to empower developers
            with comprehensive guides, in-depth tutorials, and the latest
            industry insights. Whether you&apos;re a seasoned coder or just
            starting out, our resources are tailored to accelerate your learning
            and enhance your projects.
          </Typography>
          <div className="pt-16 pb-16 pl-2">
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
        <Grid item xs={5}>
          <Image />
          
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Image2 />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="pt-9 text-justify">
            Deciding on the right technology can be tricky with so many options
            out there. Our website is here to help. We showcase a selection of
            popular technologies across different areas like frontend, backend,
            and databases. It&apos;s a quick way to get familiar with
            what&apos;s available and find what might work best for your
            projects
          </Typography>

          <div className="pt-16 pb-16">
            <button
              type="button"
              className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95"
              onClick={() => setShowPaper(!showPaper)} // Toggle visibility
            >
              {showPaper ? "Hide Technologies" : "Show Technologies"}
            </button>
          </div>
        </Grid>
      </Grid>

      {showPaper && (
        <div>
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
            }}
          >
            <div className="">
              <Grid container spacing={0.5}>
                {filteredCards?.map((data, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CustomCard {...data} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                className="pt-9"
                paddingTop={15}
              >
                Ready to dive deeper? Ty our guide creator to bring your project
                to life. It&apos;s quick, easy, and tailored to your needs. Start
                building now!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="pr-12">
              <Image3/>
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