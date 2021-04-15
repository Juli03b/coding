const fs = require('fs');
const axios = require('axios');
const {argv} = process

async function webCat () {
    const out = ~argv.indexOf('--out');
    const filePath = argv[3]
    const urls = out ? argv.slice(4) : argv.slice(2);

    try{
        for (url of urls){
            if (~url.indexOf('http')){
                const {data} = await axios.get(url);
                if (out){
                    fs.appendFileSync(filePath, data);
                }else{
                    console.log(data);
                }
            }else{
                const file = fs.readFileSync(url, 'utf-8');

                if (out){
                    fs.writeFileSync(filepath, data);
                }else{
                    console.log(file);
                }
            }
        }
    }catch(e){
        console.error('Error:', e.message);
        process.exit(1);
    }
}

const readd  = webCat();
