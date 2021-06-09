import { render } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("Should render", () => {
    render(<NewTodoForm />);    
});

it("Should match snapshots", () => {
    const { asFragment } = render(<NewTodoForm />);    

    expect(asFragment()).toMatchSnapshot();
});
