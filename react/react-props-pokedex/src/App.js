import './App.css';
import React from "react";
import Pokedex from "./Pokedex";
import POKEMON from "./defaultPokemon";;

function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <Pokedex pokemon={POKEMON} />
    </div>
  );
}

export default App;
