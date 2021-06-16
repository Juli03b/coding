import './App.css';
import Routes from "./Routes";
import dogs from "./Dogs";
import Nav from "./components/Nav";

function App({dogs}) {
  return (
    <div className="App">
      <Nav dogNames={dogs.map(dog => dog.name)} />
      <Routes dogs={dogs} />
    </div>
  );
}

App.defaultProps = {dogs}

export default App;
