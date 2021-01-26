const addTask = document.querySelector("#submit-button")
const task = document.querySelector("#task-txt")
const form = document.querySelector("#task-form")
const list = document.querySelector("ol")
let taskArr = []

form.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e)
    if(task.value){
        let newTask = document.createElement("li")
        let removeBtn = document.createElement("button")
        removeBtn.innerText = "-"
        removeBtn.setAttribute("id", "sub-button")
        newTask.innerText += task.value;
        task.value = ""
        newTask.classList.add("lis")
        list.append(newTask)
        taskArr.push(newTask.innerText);
        localStorage.setItem("ToDos" , JSON.stringify(taskArr))
        newTask.append(removeBtn)
    }else if(task.value === "clear()"){
        window.localStorage.clear()
        let lis = document.querySelectorAll("li")
        for(let li of lis){
            li.remove()
            taskArr.splice(taskArr.indexOf(li.innerContent),1)
        }
    }
    }
)
list.addEventListener("click", function(e){
    console.log(e.target.previousSibling.textContent)
    if(e.target.tagName === "LI"){
    e.target.classList.toggle("done")
    e.target.firstElementChild.classList.remove("done")
    }else if(e.target.id === "sub-button"){
        e.target.parentElement.remove()
        let idx = taskArr.indexOf(e.target.previousSibling.textContent)
        console.log(idx)
        taskArr.splice(idx,1)
        localStorage.setItem("ToDos", JSON.stringify(taskArr))
    }
})
let taskParsed = JSON.parse(localStorage.ToDos)

if(localStorage.ToDos)
    for(let todos of taskParsed){
        let task = document.createElement("li")
        let removeBtn = document.createElement("button")
        removeBtn.innerText = "-"
        removeBtn.setAttribute("id", "sub-button")
        task.classList.add("lis")
        task.innerText = todos
        list.append(task)
        task.append(removeBtn)
        taskArr.push(todos)
    }