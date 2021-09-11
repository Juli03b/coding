/**
    averagePair: Write a function called averagePair. Given a sorted array of integers and a target average, determine if
    there is a pair of values in the array where the average of the pair equals the target average. There may be more than
    one pair that matches the average target.

    Constraints:
        Time Complexity: O(N)

    Pseudocode:
        * Multiple Pointers Method
        Make pointer i = 0
        Make pointer j = len(array) - 1
        
        While i is less than j
            If average of val at i and val at j are target:
                Return true
            Else if average is greater than target:
                i++ 
                j--
            Else if average is greater than i:
                i++
            Else:
                j--
        
        Return False
        
    Examples:
        averagePair([1, 2, 3], 2.5); // true
        averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
        averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
        averagePair([], 4); // false
 */

function averagePair(array, target) {

    if(!array || !target) return;

    let i = 0; // Pointer that moves left to right
    let j = array.length - 1; // Pointer that moves right to left

    while (i < j){
        const iVal = array[i];
        const jVal = array[j];
        const average = (iVal + jVal) / 2;
        
        if(average === target){
            return true;
        }else if(average > target){
            j--;
            i++;
        }else if(average > i){
            i++;
        }else{
            j--;
        }
    }

    return false;
}

console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)) // True
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)) // false

module.exports = averagePair;