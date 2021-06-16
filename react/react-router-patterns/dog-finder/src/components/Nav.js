import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = ({dogNames}) => (
    <nav>
        <NavLink to="/dogs">Dogs</NavLink>
        {dogNames.map((name, idx) => <NavLink key={idx} to={`/dogs/${name}`} data-testid={`${name}-anchor`}>{name}</NavLink>)}
    </nav>
);

export default Nav;