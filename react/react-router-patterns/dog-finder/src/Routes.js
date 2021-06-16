import { Route, Switch } from "react-router-dom"
import DogList from "./components/DogList";
import Dog from "./components/Dog";

const Routes = ({dogs}) => (
    <Switch>
        <Route exact path="/dogs/:name"><Dog dogs={dogs}/></Route>
        <Route exact path="/dogs"><DogList dogs={dogs} /></Route>
        <Route><h1>404</h1></Route>
    </Switch>
);

export default Routes;