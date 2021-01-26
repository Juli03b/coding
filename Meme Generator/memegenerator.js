let memeForm = document.querySelector("form")
let memeButton = document.querySelector("input[type='submit']")
let textBoxes = document.querySelectorAll("input[type='text']")
let imgUrl = textBoxes[2]
let topTextBox = textBoxes[0]
let bottomTextBox = textBoxes[1]
let h1 = document.querySelector("h1")
let memesDiv = document.querySelector('div')

memeForm.addEventListener("submit", function(e){
    e.preventDefault()

    if(topTextBox.value || bottomTextBox.value ){

        let topText = document.createElement("h2")
        let bottomText = document.createElement("h2")
        let deleteX = document.createElement("p")
        let img = document.createElement('img')
        let memeFrame = document.createElement('div')

        memeFrame.classList = 'meme-frame'
        topText.classList = "top-text"
        bottomText.classList = "bottom-text"
        
        topText.textContent  = topTextBox.value
        bottomText.textContent  = bottomTextBox.value 

        imgCanv();

        deleteX.textContent = "x"
        deleteX.classList = 'meme-frame p'
        memeFrame.append(deleteX)
        
        img.src = `${imgUrl.value}`
        img.alt = "Invalid URL"

        memesDiv.append(memeFrame)
        memeFrame.append(img)
        memeFrame.append(topText, bottomText)

        memeFrame.addEventListener("click", function(e){
            memeFrame.remove()
        })

        //empty the text boxes if they arent empty
        for(let textBox of textBoxes){
            textBox.value = ''
        }
    }
})

const imgCanv = () =>{
        html2canvas(memeFrame, {
          onrendered: function(canvas) {
            canvas.className = "html2canvas";
            memesDiv.appendChild(canvas);
          },
          useCORS: true
        });
}

function randomRGB(){
    return Math.floor(Math.random() * 256);
}

// setInterval(function(){
//     h1.style.color = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
// }, 1000);
