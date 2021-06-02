import fruits from "./foods";
import {choice, remove} from "./helpers";

const App = () =>{
    const randFruit = choice(fruits);
    console.log("May I have one " + randFruit);
    console.log("Here you go: " + randFruit);
    console.log("Delicious may I have another one?");
    remove(fruits, randFruit);
    console.log(`I'm sorry, we're all out. We have ${fruits.length} fruits left.`);
}

App();