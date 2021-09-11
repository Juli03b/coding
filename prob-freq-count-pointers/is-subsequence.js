/**
    Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a
    subsequence of the characters in the second string. In other words, the function should check whether the characters in the
    first string appear somewhere in the second string, without their order changing.

    Examples:

        isSubsequence('hello', 'hello world'); // true
        isSubsequence('sing', 'sting'); // true
        isSubsequence('abc', 'abracadabra'); // true
        isSubsequence('abc', 'acb'); // false (order matters)

    Pseudocode:
        current_str = Str to store string to keep track of current str
        Pointer i
        Loop through str2:
            if current letter is in str1[i]:
                Add to the string holder
                i++
            if current_str == str1:
                Return true
        Return false

    Time Complexity - O(N + M)
 */
function isSubsequence(str1, str2) {
    let current_str = "";
    let i = 0;

    for (char of str2){
        if(char === str1[i]){
            current_str += char;
            i++;
        }
        if(current_str === str1) return true;

    }
    return false;
}

console.log("Should be true:", isSubsequence('abc', 'abracadabra'))

module.exports = isSubsequence;