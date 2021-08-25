/** product: calculate the product of an array of numbers. */
// Base case: index equals array length.
function product(nums, index=0) {
  return index === nums.length ? 1 : nums[index] * product(nums, index + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx=words.length - 1 > 0 ? 1 : 0, longestWord=words[0], currentWord = words[idx]) {
  if(idx === words.length - 1) return longestWord.length;
  if(currentWord.length > longestWord.length) longestWord = currentWord;

  return longest(words, idx + 1, longestWord);
}

/** everyOther: return a string with every other letter. */
// return letter if index is even, else, return an empty string
function everyOther(string, index=0) {
  if(index === string.length) return "";
  return (index % 2 === 0 ? string[index] : "") + everyOther(string, index + 1);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, index=str.length - 1) {
  if(index < 1) return str[index];
  return str[index] + isPalindrome(str, index - 1) === str;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index=0) {
  if(index > arr.length) return -1;
  if(arr[index] === val) return index;
  return findIndex(arr, val, index + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx=str.length - 1) {
  return idx < 1 ? str[idx] : str[idx] + revString(str, idx - 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, strings=[]) {
  if(!Object.keys(obj).length) return 0;
  for(prop in obj){
    const item = obj[prop];
    delete obj[prop]
    if(typeof item === "object") {
      gatherStrings(item, strings)
    }else if(typeof item === "string"){
      strings.push(item);
    }
  }
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, leftIdx=0, rightIdx=arr.length, middleIdx=(Math.floor((leftIdx + rightIdx) / 2)), middleVal=[arr[middleIdx]]) {
  if(leftIdx > rightIdx) return -1;

  if(val < middleVal){
    rightIdx = middleIdx - 1;
  }else if(val > middleVal){
    leftIdx = middleIdx + 1;
  }else{
    return middleVal ? middleIdx : -1;
  }

  return binarySearch(arr, val, leftIdx, rightIdx)
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
