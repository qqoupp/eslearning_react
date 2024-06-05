import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image6 from "../../components/Images/index6";

const About = () => {
  return (
    <Box className="container mx-auto p-4 pt-16">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className="pt-12">
            <Typography>
              Hi, my name is Radu Simuleac, and I&apos;m on the verge of
              completing my journey as a software engineering student. This
              website is a milestone of my undergraduate project—a testament to
              the skills and knowledge I&apos;ve gained throughout my academic
              career. It embodies my passion for facilitating creativity and
              innovation within the tech community. Here, you&apos;ll discover a
              curated selection of project ideas that spark inspiration and an
              extensive repository of tech insights that could be the bedrock of
              your next big venture. Whether seeking guidance to crystallize
              your vision or exploring the dynamic world of technology to find
              your niche, this platform is designed to support and enrich your
              creative process.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </Box>
  );
};
export default About;
