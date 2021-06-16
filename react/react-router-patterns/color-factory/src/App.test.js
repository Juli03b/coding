import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders app', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
it('Shows a color', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/colors/blue"]}>
      <App />
    </MemoryRouter>
  );
  const colorName = getByText("blue");
  
  expect(colorName).toBeInTheDocument();
});
it('Shows a color names', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );
  const colorName = getByText("blue");
  expect(colorName).toBeInTheDocument();
});
it('Shows new color form', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={["/colors/new"]}>
      <App />
    </MemoryRouter>
  );
  
  const newColorForm = getByTestId("new-color-form");
  const colorNameInput = getByTestId("name-input");
  const colorValueInput = getByTestId("value-input");
  
  expect(colorNameInput).toBeInTheDocument();
  expect(colorValueInput).toBeInTheDocument();
  expect(newColorForm).toBeInTheDocument();

  fireEvent.change(colorNameInput, { target: {value: "color"}});
  fireEvent.change(colorValueInput, { target: {value: "purple"}});
  fireEvent.submit(newColorForm);

  const colorName = getByText("color");
  
  expect(colorName).toBeInTheDocument();
});