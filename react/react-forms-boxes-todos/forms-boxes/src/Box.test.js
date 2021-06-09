import { render } from "@testing-library/react";
import Box from "./Box";

it("Should render", () => {
    render(<Box />);
});

it("Should match snapshot", () => {
    const {asFragment} = render(<Box />);

    expect(asFragment()).toMatchSnapshot();
});
