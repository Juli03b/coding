import React, { useState } from "react";
import Coin from "./Coin";

const CoinFlipper = () => {
    const randomSide = () => ["heads", "tails"][Math.floor(Math.random() * 2)];
    const [side, setSide] = useState();
    const [headsCount, setHeadsCount] = useState(0);
    const [tailsCount, setTailsCount] = useState(0);
    const flip = () => {
        setSide(randomSide());
        side === "heads" ? setHeadsCount(headsCount + 1) : setTailsCount(tailsCount + 1);
    }   
    
    return (
        <>
            <h1>You got {side}!</h1>
            <Coin side={side} />
            <button onClick={flip} data-testid="flip-btn">Flip!!!</button>
            <h3>Tails: {tailsCount}</h3>
            <h3>Heads: {headsCount}</h3>
        </>
    );
}

export default CoinFlipper;