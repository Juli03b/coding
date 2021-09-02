function bubbleSort(array) {
    for(let i = array.length; i > 1; i--){
        for(let j = 0; j < i - 1; j++){
            if(array[j] > array[j + 1]){
                const val = array[j]
                array[j] = array[j + 1]
                array[j + 1] = val
            }
        }
    }
    return array
}

module.exports = bubbleSort;