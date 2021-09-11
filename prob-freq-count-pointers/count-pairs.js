/**
    countPairs
    Given an array of integers, and a number, find the number of pairs of integers in the array whose sum is equal to
    the second parameter. You can assume that there will be no duplicate values in the array.

    Examples:
        [1, 2, 3, 4, 5]
        countPairs([3,1,5,4,2], 6) // 2 (1,5 and 2,4)
        countPairs([10,4,8,2,6,0], 10) // 3 (2,8, 4,6, 10,0)
        [2,4,6,7]
        countPairs([4,6,2,7], 10) // 1 (4,6)
        countPairs([1,2,3,4,5], 10) // 0
        countPairs([1,2,3,4,5], -3) // 0
        countPairs([0,-4],-4) // 1
        countPairs([1,2,3,0,-1,-2],0) // 2
    Pseudocode:
        Pair Counter = 0
        Pointer i = 0
        Pointer j = array.length

        Sort array in ascending order
        Loop through array:
            if i value + j value == target:
                i++
                j++
            else if i value is < target:
                i++
            else: 
                j--;
        Return pair counter

    Time Complexity - O(N * log(N))
    or
    Time Complexity - O(N)
 */
function countPairs(array, target) {
    if(!array || !array.length) return;

    array.sort((a,b) => a - b);

    let pairCount = 0;
    let i = 0;
    let j = array.length - 1;

    while(i < j){
        const iVal = array[i]
        const jVal = array[j]
        const sum = iVal + jVal;
        if(sum === target){
            pairCount++;
            i++;
            j--;
        }else if(sum < target){
            i++;
        }else{
            j--;
        }
    }

    return pairCount;
}

console.log("2", countPairs([3,1,5,4,2], 6)) // 2 (1,5 and 2,4) 
console.log("3", countPairs([10,4,8,2,6,0], 10)) // 3 (2,8, 4,6, 10,0)
console.log("1", countPairs([4,6,2,7], 10)) // 1 (4,6)
console.log("0", countPairs([1,2,3,4,5], 10)) // 0
console.log("0", countPairs([1,2,3,4,5], -3)) // 0
console.log("1", countPairs([0,-4],-4)) // 1
console.log("2",countPairs([1,2,3,0,-1,-2],0)) // 2

module.exports = countPairs;