import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DogList from "./DogList";
import dogs from "../Dogs";

it("should render", () => {
    render(
        <MemoryRouter>
            <DogList dogs={dogs} />
        </MemoryRouter>
    );
});
