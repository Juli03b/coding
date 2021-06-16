import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";
import './App.css';

function App() {
  const [colors, setColors] = useState(JSON.parse(localStorage.getItem('colors')) || {blue: "blue"});

  useEffect(() => (localStorage.setItem("colors", JSON.stringify(colors))), [colors]);

  return (
    <div className="App">
      <nav>
        <NavLink exact to="/colors">Home</NavLink>
        <NavLink exact to="/colors/new">Add Color</NavLink>
        <NavLink exact to="/colors/red">Red</NavLink>
      </nav>
      <Routes colors={colors} setColors={setColors}/>
    </div>
  );
}

export default App;
