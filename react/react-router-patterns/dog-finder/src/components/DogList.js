import { Link } from "react-router-dom";
import "./DogList.css";

const DogList = ({dogs}) => {
    return (
        <div>
            {dogs.map(({name, src}, idx) => (
                <div key={idx} className="dogs">
                    <img src={src} width="200"/>
                    <Link className="names" to={`/dogs/${name}`} data-testid={name}>{name}</Link>
                </div>
            ))}
        </div>
    );
}

export default DogList;