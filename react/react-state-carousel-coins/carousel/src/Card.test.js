import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("renders", () => {
  expect(() => render(<Card />)).not.toThrow();
});

it("matches snapshot", () => {
  const {asFragment} = render(<Card />);

  expect(asFragment()).toMatchSnapshot();
});
