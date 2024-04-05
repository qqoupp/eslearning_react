import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
const LandingPage = React.lazy(() => import("../pages/LandingPage"));
const Profile = React.lazy(() => import("../pages/Profile"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const GuideGenerator = React.lazy(() => import("../pages/GuideGenerator"));
const About = React.lazy(() => import("../pages/About"));
const ProjectGenerator = React.lazy(() => import("../pages/ProjectGenerator"));

const Loading = () => <p>Loading ...</p>;

const MainRouter = () => {
  return (
    <>
      <Header />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <SignIn />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Profile/>
              </>
            }
          />
          <Route
            path="/Guide"
            element={
              <>
                <GuideGenerator/>
              </>
            }
          />
          <Route
          path="/project"
          element={
            <>
              <ProjectGenerator/>
            </>
          }
          />
          <Route
          path="/about"
          element={
            <>
              <About/>
            </>
          }
          />
        </Routes>
      </React.Suspense>
    </>
  );
};

export default MainRouter;
