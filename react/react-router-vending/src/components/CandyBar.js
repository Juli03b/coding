import useSetBackground from "./hooks";
import { Link } from "react-router-dom";
import "./Items.css";

const CandyBar = () => {
    useSetBackground("https://bloximages.newyork1.vip.townnews.com/tulsaworld.com/content/tncms/assets/v3/editorial/2/5c/25c79ce8-c569-51b2-a4ee-d218fedf94e2/5bd0bede7ed84.image.jpg?resize=1200%2C754");
    
    return (
        <div>
            <p>one candy please</p>
            <Link to="/">Go to vending machine</Link>
        </div>
    );
}

export default CandyBar;