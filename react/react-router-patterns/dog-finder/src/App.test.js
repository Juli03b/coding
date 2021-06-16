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
// nav test - test click n stuff
it("should navigate to dog through nav anchors", () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
        <App />
    </MemoryRouter>
  );

  // find nav link
  const anchorTag = getByTestId("Whiskey-anchor");
  expect(anchorTag).toBeInTheDocument();

  fireEvent.click(anchorTag); //click on whiskey nav link
  
  const p = getByText("Whiskey is 5");
  expect(p).toBeInTheDocument();
});
it("should render dog", () => {
  const { getByText } = render(
      <MemoryRouter initialEntries={["/dogs/Whiskey"]}>
          <App />
      </MemoryRouter>
  );

  const p = getByText("Whiskey is 5");
  expect(p).toBeInTheDocument();
});
it("should render dogs", () => {
  const { getByTestId } = render(
      <MemoryRouter initialEntries={["/dogs"]}>
          <App />
      </MemoryRouter>
  );

  const whiskey = getByTestId("Whiskey");
  const duke = getByTestId("Duke");
  const perry = getByTestId("Perry");
  const tubby = getByTestId("Tubby");

  expect(whiskey).toBeInTheDocument();
  expect(duke).toBeInTheDocument();
  expect(perry).toBeInTheDocument();
  expect(tubby).toBeInTheDocument();
});
