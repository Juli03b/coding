/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, lIdx=0, rIdx=arr.length - 1){
    let pivotIdx = lIdx;
    let pivotVal = arr[pivotIdx];
    let i = pivotIdx + 1;
    let j = i;
    while(j <= rIdx){
        const jItem = arr[j];
        if(jItem <= pivotVal){
            arr[j] = arr[i]
            arr[i] = jItem;
            i++;
        }  
        j++;
    }
    arr[pivotIdx] = arr[i - 1];
    arr[i - 1] = pivotVal;
    return i - 1;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(array, left=0, right=array.length - 1, pivotIdx=0) {
    if(pivotIdx >= right) return array;
    pivotIdx = pivot(array);
    const leftA = quickSort(array, left, pivot(array, left, pivotIdx));
    const rightA = quickSort(array, left, pivot(array, pivotIdx, right));
    console.log(leftA)
    console.log(rightA)
    // left++;
    return array
}

module.exports = {quickSort, pivot};