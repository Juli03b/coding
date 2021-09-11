/**
    Write a function called twoArrayObject which accepts two arrays of varying lengths.The first array consists of keys and the
    second one consists of values. Your function should return an object created from the keys and values. If there are not enough
    values, the rest of keys should have a value of null. If there not enough keys, just ignore the rest of values.

    Examples:
        twoArrayObject(['a', 'b', 'c', 'd'], [1, 2, 3]) // {'a': 1, 'b': 2, 'c': 3, 'd': null}
        twoArrayObject(['a', 'b', 'c'], [1, 2, 3, 4]) // {'a': 1, 'b': 2, 'c': 3}
        twoArrayObject(['x', 'y', 'z'], [1, 2]) // {'x': 1, 'y': 2, 'z': null}


    Pseudocode:
        Instantiate object to be populated
        Pointer for both arrays
        Loop array with the longest length's length with i:
            Set object key to keys[i] and value to values[i] 
        return object
    
    Time Complexity: O(n)
 */
function twoArrayObject(keys, values) {
    const object = {};
    let longestLength = keys.length > values.length ? keys.length : values.length;

    for(let i = 0; i < longestLength; i++){
        if(keys[i]) object[keys[i]] = values[i] || null;
    }
    return object;
}
console.log(twoArrayObject(['a', 'b', 'c'], [1, 2, 3, 4])) // {'a': 1, 'b': 2, 'c': 3}
console.log(twoArrayObject(['x', 'y', 'z'], [1, 2])) // {'x': 1, 'y': 2, 'z': null}

module.exports = twoArrayObject;