function countDown(num){
    let cD = setInterval(function(){
        if(num === 1) {
         clearInterval(cD);
         console.log("DONE!");
        }else{
            num--;
            console.log(num)
        }
        }, 1000)
    
    }

function randomGame(){
    let countRolls = 0;
    let id = setInterval(
        function(){
        countRolls++;
        let randomNum = Math.random() 
        if(randomNum > .75){
            clearInterval(id);
        }
        console.log(countRolls)
    }
    , 1000)
}