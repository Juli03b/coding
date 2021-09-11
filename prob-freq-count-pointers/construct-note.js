/**
    Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true
     if the message can be built with the letters that you are given; otherwise, it should return false. Assume that there are only
      lowercase letters and no space or special characters in both the message and the letters.

    Constraints:
        Time Complexity: O(M + N) - If M is the length of message and N is the length of letters:

    Examples:
        constructNote('aa', 'abc') // false
        constructNote('abc', 'dcba') // true
        constructNote('aabbcc', 'bcabcaddff') // true
    
    Pseudocode:
        - Get frequencies of msg and letters
        - Loop trough characters from freq object of msg
                - If frequency of letters at char is not at least the frequency of msg at char
                    -  return False
        - Return True

        Time Complexity: O(n)

    Alternative Ideas:
        1   - Loop through msg with i -> len(array)
                - Setup counter for letter count
                - Loop through letters with j + 1 -> len(array)
                    - Add to the counter if the letter is found
                - If counter is not at least 1, return False
            - Return True
            
            Time Complexity: O(n^2)
        
 */

function frequencyCount(str){
    const frequencies = new Map() 
    for(char of str){
        frequencies.set(char, (frequencies.get(char) || 0) + 1) 
    }
    return frequencies
}

function constructNote(msg, letters) {
    if(!letters) return false;
    if(!msg) return true;

    const msgFreq = frequencyCount(msg);
    const lettersFreq = frequencyCount(letters);

    for(let char of msgFreq.keys()){
        if(lettersFreq.get(char) < msgFreq.get(char)) return false;
    }

    return true;
}

module.exports = {constructNote};