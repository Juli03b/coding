function merge(arrayA, arrayB) {
    let merged = [];
    let aIndex = 0;
    let bIndex = 0;
    while(aIndex < arrayA.length && bIndex < arrayB.length){
        const aItem = arrayA[aIndex];
        const bItem = arrayB[bIndex];
        if(aItem <= bItem){
            merged.push(aItem);
            aIndex++;
        }else{
            merged.push(bItem);
            bIndex++;
        }    
    }
    if(aIndex < arrayA.length){
        merged = [...merged, ...arrayA.slice(aIndex)]
    }else{
        console.log("ELSE ")
        console.log("BEFORE LESE MERGE", merged)
        merged = [...merged, ...arrayB.slice(bIndex)]
        console.log("AFTER LESE MERGE", merged)
    }
    return merged;
}

function mergeSort(array) {
    if(array.length <= 1) return array;
    const midIdx = Math.floor(array.length / 2);
    const leftArray = mergeSort(array.slice(0, midIdx));
    const rightArray = mergeSort(array.slice(midIdx));
    return merge(leftArray, rightArray);
}

module.exports = { merge, mergeSort};