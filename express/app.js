const {getMean, getMedian, getMode} = require('./functions');
const express = require('express');
const app = express();

class Err extends Error{
    constructor(msg, status){
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack)
    }
}

const queryCheck = req => {
    if(!Object.keys(req.query).length){
        throw new Err('Must enter numbers', 400)
    }
}

// return array with numbers from query
const getQueryNums = (req) => {
    let [nums] = Object.keys(req.query);

    nums = nums.split(',').filter((num) => {
        if (isNaN(parseInt(num))){
            throw new Err(`${num} is not a number`, 400);
        }else{
            return num;
        }
    });

    nums = nums.map(num => parseInt(num));
    
    return nums;
}

app.get('/mean', (req, res, next) => {
    try{
        queryCheck(req);
        const nums = getQueryNums(req)
        const mean = getMean(nums);
    
        return res.json({"operation": "mean", "value": mean, "numbers":nums});
    }catch(e){
        return next(e);
    }
})

app.get('/median', (req, res, next) => {
    try{
        queryCheck(req);
        const nums = getQueryNums(req);
        const median = getMedian(nums);

        return res.json({"operation": "median", "value": median, "numbers":nums});
    }catch(e){
        return next(e);
    }
})

app.get('/mode', (req, res, next) => {
    try{
        queryCheck(req);
        const nums = getQueryNums(req);
        const mode = getMode(nums);

        return res.json({"operation": "mode", "value": mode, "numbers":nums});
    }catch(e){
        return next(e)
    }
})

app.get('/all', (req, res, next) => {
    try{
        queryCheck(req);
        const nums = getQueryNums(req);
        const mode = getMode(nums);
        const mean = getMean(nums);
        const median = getMedian(nums);

        return res.json({"operation": "mode", mean, mode, median, "numbers": nums});
    }catch(e){
        return next(e)
    }
})

app.use((req, res, next) => {
    const e = new Err('Not found!!!', 404)
    return next(e)
})

app.use((error,req, res, next) => {
    return res.status(error.status || 500).json(error.msg)
})

app.listen(3000, function(){
    console.log('Server active at port 3000');
});
