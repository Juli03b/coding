import { Link } from "react-router-dom";
import useSetBackground from "./hooks";

const Chips = () => {
    useSetBackground("https://upload.wikimedia.org/wikipedia/commons/6/69/Potato-Chips.jpg");

    return (
        <div>
            <p>one Chips please</p>
            <Link to="/">Go to vending machine</Link>
        </div>
    )
}

export default Chips;