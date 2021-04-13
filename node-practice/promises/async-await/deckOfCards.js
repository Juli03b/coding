const getDeck = amt => {
    return axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${amt}`);
}
async function getCard(deckData) {
    const cardData = await axios.get(`https://deckofcardsapi.com/api/deck/${deckData.data.deck_id}/draw/?count=1`);
    const [card] = cardData.data.cards;

    console.log(`${card.value} of ${card.suit}`);

    return cardData;
}

getDeck(1)
    .then(deck => {
        const card = getCard(deck);
        const card2 = getCard(deck);
    });

async function drawCard(deckData){
    const deckRes = await deckData
    const cardData = await axios.get(`https://deckofcardsapi.com/api/deck/${deckRes.data.deck_id}/draw/`);
    const [card] = cardData.data.cards;
    
    console.log(`${card.value} of ${card.suit}`);
    return cardData
}

drawCard(getDeck(1))

const deck = getDeck(1);
const appendCard = cardData => {
    const [card] = cardData.data.cards;
    const cardImgUrl = card.images.svg;

    $('#card-div').append(`<img class="game-card mx-auto d-block" src="${cardImgUrl}"></img>`);
}
const $button = $('button');

$button.on('click', async function(evt){
    const card = await drawCard(deck)
    console.log(card);
    if (card.data.remaining)
        appendCard(card);
    else{
        $(evt.target).remove();
    }

});

