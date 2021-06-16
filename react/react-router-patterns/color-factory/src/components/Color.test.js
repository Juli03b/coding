import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Color from "./Color";

it("should render", () => {
    render(
        <MemoryRouter>
            <Color />
        </MemoryRouter>
    );
});

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Color />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot()
});