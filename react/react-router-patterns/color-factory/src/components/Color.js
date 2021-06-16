import { Link, useParams } from "react-router-dom";
import "../styles/Color.css"

const Color = ({colors}) => {
    const {color} = useParams();

    return (
        <div className="Color" style={{backgroundColor: colors?.[color] || color}}>
            <h1 className="ColorHeader">{color}</h1>
            <Link to="/colors">Go to color picker</Link>
        </div>
    );
}

export default Color;