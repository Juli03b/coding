const getMean = nums => {
    let mean = 0;
        
    nums.forEach(num => mean += num);

    mean = mean / nums.length;

    return mean;
}

const getMedian = nums => {
    let medianIdx;

    nums = nums.sort((a, b) => a - b);
    medianIdx = Math.round((nums.length) / 2)

    return nums[medianIdx]
}

const getMode = nums => {
    let mode = {num: 0, count: 0}
    let mode2 = {}

    nums.forEach(num => {
        let count = 0;

        nums.forEach(numI => {
            if(num === numI){
                count++;
            }
        });

        if(count > mode.count){
            mode.num = num;
            mode.count = count;
        }else if(count === mode.count){
            mode2.num = num;
            mode2.count = count;
        }
    });
    
    if(mode.count === mode2.count && mode.num !== mode2.num){
        mode.num = [mode.num, mode2.num];
    }

    return mode.num;
}

module.exports = {getMean, getMedian, getMode}