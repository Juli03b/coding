const fs = require('fs');
const {argv} = process

function cat () {
    
    fs.readFile(argv[2], 'utf-8', function (err, data){
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data)
        return data;
    });
}

const readd  = cat();
