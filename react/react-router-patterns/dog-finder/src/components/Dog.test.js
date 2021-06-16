import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dog from "./Dog";
import dogs from "../Dogs";

it("should render", () => {
    render(
        <MemoryRouter>
            <Dog dogs={dogs} />
        </MemoryRouter>
    );
});

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Dog dogs={dogs} />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot()
});