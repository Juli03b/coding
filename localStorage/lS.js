let checkbox = document.querySelector('#switch')
if(localStorage.DarkOn ){
document.body.style.backgroundColor = "Black" ;
} 
  
checkbox.addEventListener("click", function(){
let {checked} = checkbox;
document.body.style.backgroundColor = checked ?  "black" 
: "rgba(223, 222, 206, 0.762)"
localStorage.setItem("DarkOn" , checked )
}
)