import useSetBackground from "./hooks";
import { Link } from "react-router-dom";
import "../styles/VendingMachine.css"

const VendingMachine = () =>  {
    useSetBackground("https://vending.com/wp-content/uploads/2021/04/MarketOne-SeriesSnack6W-scaled.jpg");

    return (
        <div>
            <p>
                <Link 
                    to="/chips" 
                    className="vendingMachineOption"
                    style={{top: "25%", left: "25%"}}
                >Get Chip!</Link>
                <Link 
                    to="/soda" 
                    className="vendingMachineOption"
                    style={{top: "75%", left: "75%"}}
                >One soda please</Link>
                <Link 
                    to="/candy-bar" 
                    className="vendingMachineOption"
                    style={{top: "5%", left: "50%"}}
                >Candy bar?</Link>
            </p>
        </div>
    );
}

export default VendingMachine;