import { fireEvent, render } from "@testing-library/react";
import BoxList from "./BoxList";

it("Should render", () => {
    render(<BoxList />);
});

it("Should match snapshot", () => {
    const {asFragment} = render(<BoxList />);

    expect(asFragment()).toMatchSnapshot();
});

describe('Entering data, submiting, and ensuring box appears', function() {
    it("Should show text being typed", () => {
        const {getByTestId} = render(<BoxList />);
        const form = getByTestId("form");
        const colorTextBox = getByTestId("color");
        const heightTextBox = getByTestId("height");
        const widthTextBox = getByTestId("width");

        fireEvent.change(colorTextBox, {target: {value: "blue"}});
        fireEvent.change(heightTextBox, {target: {value: "80"}});
        fireEvent.change(widthTextBox, {target: {value: "80"}});
        
        expect(colorTextBox).toHaveDisplayValue("blue");
        expect(heightTextBox).toHaveDisplayValue("80");
        expect(widthTextBox).toHaveDisplayValue("80");

        fireEvent.submit(form)

        const box = getByTestId("box0");

        expect(box).toBeInTheDocument()
    });  
});
    