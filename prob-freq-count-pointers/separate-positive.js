/**
    Write a function called separatePositive which accepts an array of non-zero integers. Separate the positive integers to the
    left and the negative integers to the right. The positive numbers and negative numbers need not be in sorted order. The problem
    should be done in place (in other words, do not build a copy of the input array).

    Examples:
        separatePositive([2, -1, -3, 6, -8, 10]) // [2, 10, 6, -3, -1, -8]
        separatePositive([5, 10, -15, 20, 25]) // [5, 10, 25, 20, -15]
        separatePositive([-5, 5]) // [5, -5]
        separatePositive([1, 2, 3]) // [1, 2, 3]

    Pseudocode:
        Pointer i = 0
        Pointer j = array.length
        Pointer mid = array.length / 2

        While i < j:
            If i is on left side (less than j), and the value is less than 0:
                Store i val
                Delete array[i]
                Push i val back
        Return array
    Time Complexity: O(N)
 */
function separatePositive(nums) {
    let i = 0;
    let j = nums.length - 1;
    let mid = j / 2;

    while(i < j){
        const iVal = nums[i];
        const jVal = nums[j];
        if(i <= mid && iVal < 0){
            nums[i] = nums[j];
            nums[j] = iVal;
        }
        if(nums[i] > 0){ // Continue if val at i is over 0
            i++;
        }
        if(jVal < 0){// Continue j if val is less than 0 (right side is neg)
            j--;
        }
    }
    return nums
}

console.log("[5, -5]", separatePositive([-5, 5])) // [5, -5]
console.log("[2, 10, 6, -3, -1, -8]", separatePositive([2, -1, -3, 6, -8, 10])) // [2, 10, 6, -3, -1, -8]
console.log("[5, 10, 25, 20, -15]", separatePositive([5, 10, -15, 20, 25])) // [5, 10, 25, 20, -15]

module.exports = separatePositive;