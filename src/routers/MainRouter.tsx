import React from "react";
import { Routes, Route } from "react-router-dom";
const StartQuizz = React.lazy(() => import("../pages/StartQuizz"));
import Header from "../components/Header";

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
        </Routes>
      </React.Suspense>
    </>
  );
};

export default MainRouter;
