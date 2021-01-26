const sectionId = document.getElementById("container")
const sectionQuery = document.querySelector("#container")
const liSecond = document.querySelectorAll(".second")
const thirdInOl = document.querySelectorAll("ol .third")
sectionId.innerText = "Hello!"
const divFooter = document.querySelector(".footer")
divFooter.classList.add("main")
divFooter.classList.remove("main")
let li = document.createElement("li")
li.innerText = "four"
document.querySelector("ul").append(li)
let ol = document.querySelectorAll("ol li")
for(let lis of ol ){
    lis.style.backgroundColor = "green";
}
divFooter.remove()