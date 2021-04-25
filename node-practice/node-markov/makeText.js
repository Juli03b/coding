/** Command-line tool to generate Markov text. */
const fs = require('fs')
const axios = require('axios')
const MarkovMachine = require('./markov')
const {htmlToText} = require('html-to-text')


async function makeText(){
    const [option, path] = process.argv.slice(2)
    let data;

    try{
        if (option == "url"){
            data = await axios.get(path);
            data = htmlToText(data.data)

        }else{
            data = fs.readFileSync(path, 'utf8');
        }
    }catch(e){
        console.error(e.message)
        process.exit(1)
    }

    const markovData = new MarkovMachine(data)
    const markovText = markovData.makeText()
    console.log(markovText)

    return markovText

}

makeText()