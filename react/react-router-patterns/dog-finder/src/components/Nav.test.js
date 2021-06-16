import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "./Nav";
import dogs from "../Dogs";

it("should render", () => {
    render(
        <MemoryRouter>
            <Nav dogNames={dogs.map(dog => dog.name)} />
        </MemoryRouter>
    );
});
