function findRotatedIndex(array, target) {
    console.log("****NEW FUNC RUN****")

    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let i = 0;
    while(i < 6){
        i++
        console.log("left idx", leftIdx)
        console.log("right idx", rightIdx)
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);

        const leftArr = array.slice(leftIdx, middleIdx);
        const leftArrFirstVal = leftArr[0];
        const leftArrLastVal = leftArr[leftArr.length - 1];

        const rightArr = array.slice(middleIdx, rightIdx);
        const rightArrFirstVal = rightArr[0];
        const rightArrLastVal = rightArr[rightArr.length - 1];

        if(leftArrFirstVal < target && leftArrLastVal > target){
            rightIdx = middleIdx - 1;            
        }else if(rightArrFirstVal < target && rightArrLastVal > target){
            leftIdx = middleIdx + 1;
        }else if(leftArrFirstVal === target){
            return leftIdx;
        }else if(leftArrLastVal === target){
            return middleIdx - 1;
        }else if(rightArrFirstVal === target){
            return middleIdx;
        }else if(rightArrLastVal === target){
            return rightIdx - 1;
        }
    }

    return -1;
}

module.exports = findRotatedIndex