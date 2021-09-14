function guessingGame() {
    const randomNum = Math.floor(Math.random() * 100);
    let correntGuess = false;
    let numberOfGuesses = 0;
    
    return function(guess){
        if(correntGuess) return "The game is over, you already won!";
        numberOfGuesses++;
        if(guess === randomNum){
            correntGuess = true;
            return `You win! You found ${randomNum} in ${numberOfGuesses} guesses.`;
        }else if(guess > randomNum){
            return `${guess} is too high!`;
        }else if (guess < randomNum){
            return `${guess} is too low!`;
        }
    }
}

module.exports = { guessingGame };
