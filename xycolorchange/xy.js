document.addEventListener("mousemove", function(e){
    console.log(e.pageX * 255 / window.innerWidth, e.offsetY, window.innerWidth, window.innerHeight)
    document.body.style.backgroundColor = `rgb(${ e.pageX * 255 / window.innerWidth}, 0, ${e.pageY * 255 / window.innerHeight})`
})