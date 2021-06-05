import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoinFlipper from "./CoinFlipper";

it("renders", () => {
    expect(() => render(<CoinFlipper />)).not.toThrow();
});

it("should not render image on load", () => {
    const { getAllByAltText } = render(<CoinFlipper />);

    expect(() => getAllByAltText("heads")).toThrow();
});

it("works when you click on flip", () => {
    const { queryByTestId, queryByAltText } = render(<CoinFlipper />);
    const flipBtn = queryByTestId("flip-btn");

    // flip coin
    fireEvent.click(flipBtn);
  
    // expect the second image to show, but not the first
    expect(queryByAltText("tails") || queryByAltText("heads")).toBeInTheDocument();
  });
  