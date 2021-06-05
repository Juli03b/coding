import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders", () => {
  expect(() => render(<Carousel />)).not.toThrow();
});

it("matches snapshot", () => {
  const {asFragment} = render(<Carousel />);

  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  
  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // go back to the first image
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});


describe('test arrow not showing on last or firt image', function() {
  it("should not show arrow when on the last image", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    const rightArrow = queryByTestId("right-arrow");
  
    // move forward in the carousel
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
  
    // expect the third image to show, but not the first
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  
    // arrow should not be found and return null
    const el = queryByTestId("right-arrow")
    expect(el).toEqual(null);
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  
  });

  it("should not show arrow when on the first image", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // arrow should not be found and return null
    const leftArrow = queryByTestId("left-arrow");

    expect(leftArrow).toBe(null);
    // expect only the first image to show
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  });
});