import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpPage from "./index";

test("Renders Sign Up Page", () => {
  render(<SignUpPage />);
  const linkElement = screen.getByText(`Sign Up`);
  expect(linkElement).toBeInTheDocument();
});