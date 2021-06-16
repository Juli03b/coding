import { Route, Switch } from "react-router-dom";
import Color from "./components/Color";
import NewColor from "./components/NewColor";
import ColorList from "./components/ColorList";

const Routes = ({colors, setColors}) => {
    return (
        <Switch>
            <Route exact path="/colors"><ColorList colors={colors}/></Route>
            <Route exact path="/colors/new"><NewColor setColors={setColors}/></Route>
            <Route exact path="/colors/:color"><Color colors={colors} /></Route>
        </Switch>
    );
}

export default Routes;