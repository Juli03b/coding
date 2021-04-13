const body = document.querySelector('body');

const multipleNumGenerator = (amt, max) => {
    const nums = [];

    for (let  i = 0; i < amt; i++) {
        nums.push(Math.floor(Math.random() * max));
    }

    return nums;
}

const appendParagraph = text => {
    const paragraph = document.createElement('p');

    paragraph.innerText = text;
    body.appendChild(paragraph);
}

const nums = multipleNumGenerator(3, 50)

async function favoriteNumberFact(num){ 
    const {data} = await axios.get(`http://numbersapi.com/${num}?json`)

    return data.text
}

console.log(favoriteNumberFact(2).then(fact => console.log(fact)))

async function appendRandNums (){
    const data = await Promise.all([axios.get(`http://numbersapi.com/random`), 
                                axios.get(`http://numbersapi.com/random`), 
                                axios.get(`http://numbersapi.com/random`)]);

    for (num of data){
        console.log(num)
        appendParagraph(num.data);
    }
}

appendRandNums()

async function appendFourFavNumFacts(num){
    let facts = [];

    for (let i = 0; i < 4; i++){
        facts.push(axios.get(`http://numbersapi.com/${num}?json`))
    }

    facts = await Promise.all(facts)

    for (let fact of facts){
        console.log(fact)
        appendParagraph(fact.data.text)
    }
}

appendFourFavNumFacts(2)