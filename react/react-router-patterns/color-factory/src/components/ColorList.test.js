import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ColorList from "./ColorList";

it("should render", () => {
    render(
        <MemoryRouter>
            <ColorList />
        </MemoryRouter>
    );
});

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <ColorList />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot()
});