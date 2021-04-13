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

axios.get(`http://numbersapi.com/2?json`).then(data => console.log(data.data.text))
axios.get(`http://numbersapi.com/${nums[0]},${nums[1]},${nums[2]}`).then(data => {
    for (num in data.data){
        appendParagraph(data.data[num]);
    }
});

const facts = [];

for (let i = 0; i < 4; i++){
    facts.push(axios.get(`http://numbersapi.com/2?json`))
}

Promise.all(facts).then(data => {
    for (let facts of data){
        appendParagraph(facts.data.text)
    }
})