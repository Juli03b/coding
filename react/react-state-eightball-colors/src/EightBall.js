import React, {useState} from "react";
import answers from "./eightBallAnswers";
import "./EightBall.css";
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const EightBall = () => {
    const startingState = {msg:"Think of a question", color:"black"};
    const [{msg, color}, setAnswer] = useState(startingState);
    const reveal = () => {
        const randomAnswer = randomItem(answers);
        setAnswer(randomAnswer);
    }
    
    return (
        <>
            <div id="Eight-Ball" style={{backgroundColor: color}} onClick={reveal}>
                <p id="Eight-Ball-Msg">{msg}</p>
            </div>
            <button onClick={() => setAnswer(startingState)}>Reset</button>
        </>
    );
}

export default EightBall;