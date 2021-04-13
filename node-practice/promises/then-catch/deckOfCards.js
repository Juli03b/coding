const getDeck = amt => {
    return axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${amt}`);
}
const getCard = deckData => {
    const cardData = axios.get(`https://deckofcardsapi.com/api/deck/${deckData.data.deck_id}/draw/?count=1`);
    
    cardData.then( data => { 
        const [card] = data.data.cards;
        console.log(`${card.value} of ${card.suit}`);
    });

    return cardData;
}
getDeck(1)
    .then(deck => {
        const card = getCard(deck);
        const card2 = getCard(deck);
    });

axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    .then(data => {
        const [card] = data.data.cards;
        console.log(`${card.value} of ${card.suit}`);
        
        return axios.get(`https://deckofcardsapi.com/api/deck/${data.data.deck_id}/draw/`);
    })
    .then(data => {
        const [card] = data.data.cards;
        console.log(`${card.value} of ${card.suit}`);
    });


const deck = getDeck(1);
const appendCard = cardData => {
    const [card] = cardData.data.cards;
    const cardImgUrl = card.images.svg;

    $('#card-div').append(`<img class="game-card mx-auto d-block" src="${cardImgUrl}"></img>`);
}
const $button = $('button');

$button.on('click', function(evt){
    deck.then(deck => getCard(deck))
        .then(card => {
            console.log(card);
            if (card.data.remaining)
                appendCard(card);
            else{
                $(evt.target).remove();
            }
        });
});