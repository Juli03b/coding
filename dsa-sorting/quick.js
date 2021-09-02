/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, lIdx=0, rIdx=arr.length - 1){
    let pivotIdx = lIdx;
    let pivotVal = arr[pivotIdx];
    let i = pivotIdx + 1; // i keeps track of the last swapped element idx.
    let j = i; // j is used to look for items that are leff than or equal to pivot value
    while(j <= rIdx){
        const jItem = arr[j];
        if(jItem <= pivotVal){
            arr[j] = arr[i]
            arr[i] = jItem;
            i++;
        }  
        j++;
    }
    // after loop swap element at i - 1 with pivot
    arr[pivotIdx] = arr[i - 1];
    arr[i - 1] = pivotVal;
    return i - 1;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(array, left=0, right=array.length - 1) {
    if(left >= right) return array;
    const pivotIdx = pivot(array, left, right);
    // decrese/increase pivot idx to narrow down the array
    quickSort(array, left, pivotIdx - 1);
    quickSort(array, pivotIdx + 1, right);
    return array
}

module.exports = {quickSort, pivot};