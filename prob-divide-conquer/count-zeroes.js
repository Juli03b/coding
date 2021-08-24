// *NEED TO WORK ON
function countZeroes(array) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;
    let zeroCount = 0;
    
    while(leftIdx <= rightIdx){

        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = array[middleIdx];
        const previousValue = array[middleIdx - 1];
        
        if(middleValue === 1){
            leftIdx = middleIdx + 1;
        }else if(middleValue === 0){
            if(previousValue === 0){
                return rightIdx - (middleIdx - 2)
            }

            zeroCount++;
            leftIdx = middleIdx + 1;
        }
    }
    return zeroCount
}

module.exports = countZeroes