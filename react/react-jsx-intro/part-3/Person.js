const Person = ({name, age, hobbies}) => (
    <span>
        <p>Learn more about this person</p>
        <p>{name.slice(0, name.length > 8 ? 6 : name.length)}</p>
        <h3>{age >= 18 ? "Please go vote!" : "You must be 18!"}</h3>
        <ul>
            {hobbies.map( hobby => <li>{hobby}</li>)}
        </ul>
    </span>
);