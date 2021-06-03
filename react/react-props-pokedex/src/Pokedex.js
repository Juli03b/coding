import Pokecard from "./Pokecard";
import "./Pokedex.css";

const getSpriteURL = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const Pokedex = ({pokemon}) => {
    pokemon = pokemon.map( poke => <Pokecard key={poke.id} name={poke.name} type={poke.type} image={getSpriteURL(poke.id)} /> );
    return <ul>{pokemon}</ul>
};

export default Pokedex;