const fs = require('fs');
const axios = require('axios');
const {argv} = process

async function webCat () {
    const url = argv[2]

    if (~url.indexOf('http')){
        try{
            const {data} = await axios.get(url);
        }catch(e){
            console.error('Error:',e.message);
            process.exit(1)
        }
        console.log(data)
        return data
    }else{
        const file = fs.readFileSync(url, 'utf-8')
        console.log(file)
        return data
    }
}

const readd  = webCat();
