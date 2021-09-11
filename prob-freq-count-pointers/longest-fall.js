/**
    Write a function called longestFall, which accepts an array of integers, and returns the length of the longest consecutive
    decrease of integers.

    Examples:

        longestFall([5, 3, 1, 3, 0]) // 3, 5-3-1 is the longest consecutive sequence of decreasing integers
        longestFall([2, 2, 1]) // 2, 2-1 is the longest consecutive sequence of decreasing integers
        longestFall([2, 2, 2]) // 1, 2 is the longest consecutive sequence of decreasing integers
        longestFall([5, 4, 4, 4, 3, 2]) // 3, 4-3-2 is the longest
        longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]) // 5, 9-8-7-6-5 is the longest
        longestFall([]) // 0

    Pseudo:
        longestFallCount = 0    * Counter for the longest fall
        currentFallCount = 0    * Counter for the current longest fall
        for i in nums.length:
            currentVal = numbers[i]
            previousVal = numbers[i - 1]

            If currentVal < previousVal:
                currentFallCount++;
            Else:
                longestFallCount = currentFallCount;       * Store the current fall to reset it
                currentFallCount = 0

        Return longestFallCount
    
    Time Complexity: O(n)
 */

function longestFall(nums) {
    if(!nums.length) return 0;

    let longestFallCount = 0;
    let currentFallCount = 0;

    for(i = 1; i < nums.length + 1; i++){
        if(nums[i] < nums[i - 1]){
            currentFallCount++;
        }else if(currentFallCount > longestFallCount){
            longestFallCount = currentFallCount;
            currentFallCount = 0;
        }
    }

    return longestFallCount + 1;
}

console.log(longestFall([5, 4, 4, 4, 3, 2])) // 3, 4-3-2 is the longest
console.log(longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]) )// 5, 9-8-7-6-5 is the longest

module.exports = longestFall;