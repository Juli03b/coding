const form = document.querySelector("#logo-form")
const submitBtn = document.querySelector("#submit")
const brandName = document.querySelector("input[name = 'brand-name']")
const color = document.querySelector("input[name = 'color']")
const fntSiz = document.querySelector("input[name = 'font-size']")
const sec = document.querySelector("#logos")
submitBtn.addEventListener("click",function(e){
    e.preventDefault()
    
    let newLogo = document.createElement("h2")
    newLogo.innerText = brandName.value;
    newLogo.style.color = color.value;
    newLogo.style.fontSize = `${fntSiz.value}px`
    sec.append(newLogo)
    console.log("sbmt")
    if(brandName.value === "clear()"){
        sec.innerText = ""
        
    }
} )