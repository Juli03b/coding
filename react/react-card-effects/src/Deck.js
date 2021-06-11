import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Deck.css";

const Deck = () =>  {
    const [ autoDraw, setAutoDraw ] = useState(false);
    const [ card, setCard ] = useState();
    const [ deckId, setDeckId ] = useState();
    const newDeckApi = `https://deckofcardsapi.com/api/deck/new/draw/?count=1`;
    const drawApi = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    const timerId = useRef();
    const button = useRef();

    useEffect(() => {
        button.current.innerText = autoDraw ? "Stop drawing" : "Draw cards";

        if(!deckId){
            const initialDraw = async () => {
                const res = await axios.get(newDeckApi);

                setDeckId(res.data.deck_id);
                setCard(res.data.cards[0]);
            }

            initialDraw();
        }else if (autoDraw){
            timerId.current = setInterval(async () => {
                const res = await axios.get(drawApi);
                if(res.data.success){
                    setCard(res.data.cards[0]);
                }else{
                    alert("Error: no cards left in the deck!!")
                    setAutoDraw(false);
                }
            }, 1000);

            return () => clearInterval(timerId.current);
        }
    }, [newDeckApi, autoDraw, deckId, drawApi]);

    const handleClick = ()  => {
        setAutoDraw(!autoDraw);
        if(!autoDraw) clearInterval(timerId);
    }
    
    return (
        <>
            {card   &&
                <p>Loading...</p>
                    &&
                <img src={card.image} alt={card.code}/>
            }
            <button onClick={handleClick} ref={button} ></button>

        </>
    )
};

export default Deck;