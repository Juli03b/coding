import { useParams } from "react-router-dom";

const Dog = ({dogs}) => {
    const {name} = useParams();
    const [dog] = dogs.filter(dog => name === dog.name);

    return (
        <div>
            {   dog ?         
                <>    
                    <img className="dogs" src={dog.src} width="500" />
                    <p>{dog.name} is {dog.age}</p>
                    {dog.facts.map( (fact, idx) => <p key={idx}>{fact}</p>)}
                </> 
            : 
                <p>Dog not found :(</p>
            }
        </div>
    );
}

export default Dog;