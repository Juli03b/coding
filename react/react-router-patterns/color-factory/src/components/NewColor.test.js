import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewColor from "./NewColor";

it("should render", () => {
    render(
        <MemoryRouter>
            <NewColor />
        </MemoryRouter>
    );
});

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <NewColor />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot()
});