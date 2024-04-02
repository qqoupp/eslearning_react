import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import { getProjectIdeea } from "../../api/projectIdeeaApi";
import { Box, Grid, Typography } from "@mui/material";
import Image4 from "../../components/Images/index4";

interface ProjectIdeea {
  id: number;
  name: string;
  description: string;
  type: string;
}

export default function ResponsiveStack() {
  const [projects, setProjects] = React.useState<ProjectIdeea[]>([]);

  useEffect(() => {
    getProjectIdeea()
      .then((data: ProjectIdeea[]) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching user projects:", error);
        // Handle the error state
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box className="container mx-auto p-4 pt-16">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="pt-12">
            <Image4 />
          </div>
        </Grid>
        <Grid item xs={8}>
            <Stack
            direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            borderBottom={1}
            >
            <Typography
              variant="h4"
              component="div"
              className="text-4xl md:text-5xl pt-5"
                paddingRight={4}
            >
                Category
            </Typography>
            <Typography
              variant="h4"
              component="div"
              className="text-4xl md:text-5xl pt-5"
              paddingRight={10}

            >
                Name
            </Typography>
            <Typography
              variant="h4"
              component="div"
              className="text-4xl md:text-5xl pt-5"
            >
                Description
            </Typography>
            </Stack>
          <div className="overflow-auto" style={{height:"600px"}}>
            {projects.map((project) => (
              <Stack
                key={project.id}
                direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
                spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                borderBottom={1}
                borderTop={1}
                padding={2}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#001524" }}
                  paddingRight={2}
                  borderRight={1}
                >
                  {project.type}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#001524" }}
                  paddingRight={2}
                  borderRight={1}
                >
                  {project.name}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#001524" }}
                >
                  {project.description}
                </Typography>
              </Stack>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
