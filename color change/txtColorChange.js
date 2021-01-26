function rndRGB(){
    let randomNum = Math.floor(Math.random() * 256)
    return randomNum
}
const letters = document.querySelectorAll("span")
setInterval(
function(){
for(let letter of letters){
    letter.style.color = `rgb(${rndRGB()}, ${rndRGB()}, ${rndRGB()})`
}
}
, 900)