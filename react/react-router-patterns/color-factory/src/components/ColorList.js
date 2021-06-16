import { Link } from "react-router-dom";

const ColorList = ({colors}) => {
    return (
        <div>
            <div>
                <h1>Color Factory!</h1>
                <Link to="/colors/new">Add new color</Link>
            </div>
            <p>Colors:</p>
            <ul>
                {Object.keys(colors).map((name, idx) => (
                    <li key={idx} style={{listStyle: "none"}}>
                        <Link to={`/colors/${name}`}>{name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ColorList;