import { Link } from "react-router-dom";
import useSetBackground from "./hooks";

const Soda = () => {
    useSetBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfwRRVlbFkFmqUiA7LFDYe0l1fxrxPyeNPg&usqp=CAU");

    return (
        <div>
            <p>Enjoy soda!</p>
            <Link to="/">Go to vending machine</Link>
        </div>
    );
}

export default Soda;