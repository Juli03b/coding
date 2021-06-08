import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";
import Cell from "./Cell";

it("Render cell works", () => {
    render(<Cell />);
});

it("Matches snapshot", () => {
    const { asFragment } = render(<Cell />);
    
    expect(asFragment()).toMatchSnapshot();
});