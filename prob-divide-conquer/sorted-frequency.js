// *NEED TO WORK ON
function sortedFrequency(array, target) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let targetCount = 0;

    while(leftIdx <= rightIdx){
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = array[middleIdx];
        
        if(middleValue > target){
            rightIdx = middleIdx - 1;
        }else if(middleValue < target){
            leftIdx = middleIdx + 1;
        }else{
            if(array[middleIdx - 1] === target){
                leftIdx++;
            }else if(array[middleIdx + 1] === target){
                rightIdx--;
            }
            targetCount++;
        }
    }
    
    return targetCount || -1;
}

module.exports = sortedFrequency