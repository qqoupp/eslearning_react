import React from "react";
import { Routes, Route } from "react-router-dom";
const StartQuizz = React.lazy(() => import("../pages/StartQuizz"));
import Header from "../components/Header";
const SignUp = React.lazy(() => import("../pages/SignUp"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

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
                <StartQuizz />
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
        </Routes>
      </React.Suspense>
    </>
  );
};

export default MainRouter;
