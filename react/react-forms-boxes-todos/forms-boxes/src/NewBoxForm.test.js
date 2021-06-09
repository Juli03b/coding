import { fireEvent, render } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("Should render", () => {
    expect( () => render(<NewBoxForm />)).not.toThrow();
});

it("Should match snapshot", () => {
    const {asFragment} = render(<NewBoxForm />);

    expect(asFragment()).toMatchSnapshot();
});

it("Should show text being typed", () => {
    const {getByTestId} = render(<NewBoxForm />);
    const textBox = getByTestId("color");

    fireEvent.change(textBox, {target: {value: "blue"}});
    
    expect(textBox).toHaveDisplayValue("blue");
});