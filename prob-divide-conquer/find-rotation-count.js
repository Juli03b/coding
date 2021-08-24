// STEPS:
// find lowest number
//ammount of numbers after it is the ammount of rotations
// so: index of lowest number
// *NEED TO WORK ON: fix finding min
function findRotationCount(array) {
    let leftIdx = 0;
    let rightIdx = array.length;
    let lowestIdx = Math.floor((leftIdx + rightIdx) / 2);

    while(leftIdx <= rightIdx){
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        const middleValue = array[middleIdx];

        if(middleValue > array[lowestIdx]){
            rightIdx = middleIdx - 1;
        }else if(middleValue < array[lowestIdx]){
            leftIdx = middleIdx + 1;
            lowestIdx = middleIdx
        }else if(middleValue > array[middleIdx - 1]){
            leftIdx = middleIdx - 1;
            lowestIdx = middleIdx - 1
        }else{
            lowestIdx = middleIdx;
            return lowestIdx
        }
    }


}

module.exports = findRotationCount