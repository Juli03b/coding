function curriedAdd(total) {
    if(!total) return 0;

    return function accumulator(num){
        if(!num) return total;
        total += num;
        return accumulator;
    }
}

module.exports = { curriedAdd };
