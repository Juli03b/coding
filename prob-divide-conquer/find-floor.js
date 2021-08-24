function findFloor(array, value) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let closestValue;

    while(leftIdx <= rightIdx){
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = array[middleIdx];

        if(middleValue > value){
            rightIdx = middleIdx - 1;
        }else if(middleValue < value){
            closestValue = middleValue;
            leftIdx = middleIdx + 1;
        }else{
            return middleIdx;
        }
    }
    
    return closestValue || -1;
}
module.exports = findFloor