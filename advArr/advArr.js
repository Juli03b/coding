// recreating forEach
function myForEach(array, callback){
    for(let i = 0; i < array.length; i++){
      callback(array[i], i, array);
    }
  }

//recreating map
function map(arr, callback){
    let newArr = []
    for(let idx in arr){
        newArr.push(callback(arr[idx], idx, arr))
    }
    return newArr;
}

//recreating filter
function filter(arr, callback){
    let newArr = [];
    for(let idx in arr){
        if(callback(arr[idx], idx, arr)){
            newArr.push(arr[idx]);
        }
    }
    return newArr;
}

//recreating some
function some(arr, callback){
    for(let idx in arr){
        if(callback(arr[idx], idx, arr)) return true;
    }
    return false
}

//recreating every
function every(arr, callback){
    for(let idx in arr){
        if(!(callback(arr[idx], idx, arr))) return false;
    }
    return true;
}

//recreating find
function find(arr, callback){
    for (let idx in arr) {
       if(callback(arr[idx], idx, arr)) return arr[idx];
    }
}

//recreating findIndex
function findIndex(arr, callback){
    for(let idx in arr){
        if(callback(arr[idx], idx, arr)) return idx;
    }
    return -1; 
}

const dogBreeds = ['chihuahua', 'pit bull', 'labrador', 'cane corso', 'husky', 'great dane'];

const songs = [
    {
        song: 'Nights',
        rating: '9/10',
        artist: 'Frank Ocean'
    }, 
    {
        song: 'Sleep',
        rating: '7.6/10',
        artist: 'Nick Hackim'
    },
    {

        song: 'Vacation',
        rating: '8.4/10',
        artist: 'Still Woozy'
    }
];
//songs.map(function(song){
//    return `${song.song} by ${song.artist}`
//    //return example: ['Nights by Frank Ocean'...etc]
//})

function addArr(arr){
//uses myForEach function
    let sums = 0;
    myForEach(arr, function(num, i){
        sums += num;
    })
    return sums
};

function add(nums){
    let a = 0;
    nums.forEach(function(){
        a += nums;
    })
    return a ;
}
function add(a , b){
     console.log(a + b);
}

function sub(a , b){
    return a - b;
}

function divide( a , b){
    return a / b;
}

const mathFuncs = [add, sub, divide]

function doMath(a , b, mathFunc){
    return mathFunc(a , b)
}

function doAllMaths(a , b){
    mathFuncs.forEach(func => {
    console.log(func(a, b))       
    })
}