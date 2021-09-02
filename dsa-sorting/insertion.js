function insertionSort(array) {
    for(let i = 1; i < array.length; i++){
        let j = i;
        while(j > 0 && array[j - 1] > array[j]){
            const jVal = array[j];
            array[j] = array[j - 1];
            array[j - 1] = jVal;
            j--;
        }
    }
    return array
}

module.exports = insertionSort;