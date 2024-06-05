import React from "react";
import { render, screen } from "@testing-library/react";
import SignInPage from "./index";
test("Renders Sign In Page", () => {
  render(<SignInPage />);
  const linkElement = screen.getByText(`Sign In`);
  expect(linkElement).toBeInTheDocument();
});
