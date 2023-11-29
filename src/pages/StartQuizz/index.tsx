import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CustomCard from "../../components/Cards";
import { Paper, Typography } from "@mui/material";
import Image from "../../components/Images";
import { Link } from "react-router-dom";
import cardData from "./cardData.json"; // Ensure the path is correct
import Image2 from "../../components/Images/index2";

const StartQuizz: React.FC = () => {
  const [showPaper, setShowPaper] = useState(false);
  return (
    <div className="p-20">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            Elevate Stack Learning
          </Typography>
          <Typography variant="h4" className="pt-9 text-justify">
            Welcome to E.S.L., your hub for navigating the modern landscape of
            web development technologies. Our mission is to empower developers
            with comprehensive guides, in-depth tutorials, and the latest
            industry insights. Whether you&apos;re a seasoned coder or just
            starting out, our resources are tailored to accelerate your learning
            and enhance your projects.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingBottom={20}>
          <Image />
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
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Image2 />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="pt-9 text-justify">
            Welcome to E.S.L., your hub for navigating the modern landscape of
            web development technologies. Our mission is to empower developers
            with comprehensive guides, in-depth tutorials, and the latest
            industry insights. Whether you&apos;re a seasoned coder or just
            starting out, our resources are tailored to accelerate your learning
            and enhance your projects.
          </Typography>

          <div className="pt-16 pb-16">
            <button
              type="button"
              className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95"
              onClick={() => setShowPaper(!showPaper)} // Toggle visibility
            >
              {showPaper ? "Hide Cards" : "Show Cards"}
            </button>
          </div>
        </Grid>
      </Grid>

      {showPaper && (
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
              {cardData.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CustomCard {...data} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Paper>
      )}
      <div className="pt-16 pb-16">
        <Link to={"/signin"}>
          <button
            type="submit"
            className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Try it out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartQuizz;
