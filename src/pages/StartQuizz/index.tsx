import React from "react";
import Grid from "@mui/material/Grid";
import CustomCard from "../../components/Cards";
import { Typography } from "@mui/material";
import Image from "../../components/Images";
import { Link } from "react-router-dom";

const cardData = [
  {
    title: "React",
    subheader: "Frontend Library",
    content: "A JavaScript library for building user interfaces.",
    expandableContent:
      "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  },

  {
    title: "Node.js",
    subheader: "Backend Runtime",
    content: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    expandableContent:
      "Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",
  },
  {
    title: "Angular",
    subheader: "Frontend Framework",
    content: "A platform for building mobile and desktop web applications.",
    expandableContent:
      "Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges.",
  },
  {
    title: "Django",
    subheader: "Backend Framework",
    content:
      "A high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
    expandableContent:
      "Built by experienced developers, Django takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.",
  },
  {
    title: "Vue.js",
    subheader: "Frontend Framework",
    content: "The Progressive JavaScript Framework.",
    expandableContent:
      "Vue.js is designed from the ground up to be incrementally adoptable. The core library focuses on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.",
  },
  {
    title: "PostgreSQL",
    subheader: "Database System",
    content: "An advanced open source relational database.",
    expandableContent:
      "PostgreSQL offers sophisticated features such as Multi-Version Concurrency Control (MVCC), point in time recovery, tablespaces, and more. It's known for its stability and robustness.",
  },
  {
    title: "Flask",
    subheader: "Backend Framework",
    content: "A lightweight WSGI web application framework in Python.",
    expandableContent:
      "Flask is designed to be easy to use and extend, making it a great choice for building simple web applications and rapid prototyping in Python.",
  },
  {
    title: "Docker",
    subheader: "Containerization Platform",
    content:
      "A platform for developing, shipping, and running applications in containers.",
    expandableContent:
      "Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. Containers are lightweight and provide a consistent, portable software environment.",
  },
  {
    title: "Kubernetes",
    subheader: "Container Orchestration",
    content:
      "An open-source system for automating deployment, scaling, and management of containerized applications.",
    expandableContent:
      "Kubernetes provides a framework to run distributed systems resiliently, scaling up or down as needed, handling failover, and providing deployment patterns like canaries.",
  },
  {
    title: "TensorFlow",
    subheader: "Machine Learning Library",
    content:
      "An open source library for numerical computation and machine learning.",
    expandableContent:
      "TensorFlow offers a comprehensive ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML, and developers easily build and deploy ML-powered applications.",
  },
  {
    title: "AWS",
    subheader: "Cloud Computing Platform",
    content:
      "A subsidiary of Amazon providing on-demand cloud computing platforms.",
    expandableContent:
      "AWS offers a broad set of global cloud-based products including compute, storage, databases, analytics, networking, mobile, developer tools, management tools, IoT, security, and enterprise applications.",
  },
  {
    title: "React Native",
    subheader: "Mobile Framework",
    content: "A framework for building native apps using React.",
    expandableContent:
      "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces. Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.",
  },
];  
const StartQuizz: React.FC = () => {
  return (
    <div className="pt-20">
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
            <Typography variant="h2" className="text-justify">
                Elevate Stack Learning</Typography>
          <Typography variant="h4" className="pt-9 text-justify" >
            Welcome to E.S.L., your hub for navigating the modern landscape of
            web development technologies. Our mission is to empower developers
            with comprehensive guides, in-depth tutorials, and the latest
            industry insights. Whether you&apos;re a seasoned coder or just
            starting out, our resources are tailored to accelerate your learning
            and enhance your projects.
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Image />
        </Grid>
      </Grid>

      <div className="pt-16 pb-16 ">
        <Link to={"/signin"}>
          <button
            type="submit"
            className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Try it out
          </button>
        </Link>
      </div>

      <Grid container spacing={0.5}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CustomCard {...data} />
          </Grid>
        ))}
      </Grid>
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
