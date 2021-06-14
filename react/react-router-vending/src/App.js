import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import VendingMachine from './components/VendingMachine';
import CandyBar from './components/CandyBar';
import Chips from './components/Chips';
import Soda from './components/Soda';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <NavLink exact to="/">Vending Machine</NavLink>
          <NavLink exact to="/chips">Chips</NavLink>
          <NavLink exact to="/soda">Soda</NavLink>
          <NavLink exact to="/candy-bar">Candy Bar</NavLink>
        </nav>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/chips">
          <Chips />
        </Route>
        <Route exact path="/soda">
          <Soda />
        </Route>
        <Route exact path="/candy-bar">
          <CandyBar />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
