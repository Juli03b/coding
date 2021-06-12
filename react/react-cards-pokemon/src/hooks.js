import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
      setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
}

const useAxios = (url) => {
  const [cards, setCards] = useState([]);
  const addCard = async (moreUrl = "") => {
    const response = await axios.get(url + moreUrl);
    setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  };
  const removeCards = async () => {
    setCards([]);
  }

  return [cards, addCard, removeCards];
}

export { useFlip, useAxios };