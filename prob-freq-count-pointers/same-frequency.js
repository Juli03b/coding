function frequencyCount(str){
    const frequencies = new Map() 
    for(char of `${str}`){
        frequencies.set(char, (frequencies.get(char) || 0) + 1) 
    }
    return frequencies
}

/**
    sameFrequency
    Write a function called sameFrequency. Given two positive integers, 
    find out if the two numbers have the same frequency of digits.

    Examples:
        sameFrequency(182,281) // true
        sameFrequency(34,14) // false
        sameFrequency(3589578, 5879385) // true
        sameFrequency(22,222) // false

    Pseudocode:
        If intigers aren't the same length, the frequency is already different
        Get frequency of intiger 1
        Get frequency of intiger 2

        Loop through keys of frequnecy 1:
            If frequency of current number in int1 and in2 are not the same:
                Return false
        Return True

    Time Complexity - O(N + M)
 */
function sameFrequency(int1, int2) {
    if(`${int1}`.length !== `${int2}`.length) return false;
    
    const int1Freq = frequencyCount(int1)
    const int2Freq = frequencyCount(int2)

    for(let key of int1Freq.keys()){
        if(int1Freq.get(key) !== int2Freq.get(key)) return false;
    }

    return true;
}

console.log(sameFrequency(182,281), "should be", true) // true
console.log(sameFrequency(34,14), "should be", false) // false
console.log(sameFrequency(3589578, 5879385), "should be", true) // true
console.log(sameFrequency(22,222), "should be", false) // false

module.exports = sameFrequency;