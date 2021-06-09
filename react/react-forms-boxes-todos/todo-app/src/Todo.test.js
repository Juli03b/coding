import { render } from "@testing-library/react";
import Todo from "./Todo";

it("Should render", () => {
    render(<Todo />);    
});

it("Should match snapshots", () => {
    const { asFragment } = render(<Todo />);    

    expect(asFragment()).toMatchSnapshot();
});
