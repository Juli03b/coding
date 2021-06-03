import "./Pokecard.css"

const Pokecard = ({name, image, type}) => (
    <li>
        <b>{name}</b>
        <p>{type}</p>
        <img src={image} alt={name} width="300" />
    </li>
);

export default Pokecard;