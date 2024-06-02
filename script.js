function main (){
    let input = document.querySelector("#text")
    let root = document.querySelector('ul')
 
    let all = document.querySelector(".all")
    let active = document.querySelector(".active")
    let completed = document.querySelector(".completed")
    let clear = document.querySelector(".clear")

    let activeButton = "all"

    let allTodos = JSON.parse(localStorage.getItem('todos')) || [
        {
            name:"PUBG",
            isDone:false,
        },
        {
            name:"GTA6",
            isDone:false,
        },
        
    ]

    function handleInput(event){
        if (event.keyCode === 13 && event.target.value !== ""){
            allTodos.push(
                {
                    name:event.target.value,
                    isDone: false,
                }
            )
    
            event.target.value = ''
            createUi()
        }
        localStorage.setItem('todos',JSON.stringify(allTodos))
    }

    function handleDelete(event){
        let id = event.target.dataset.id
        allTodos.splice(id,1)
        localStorage.setItem('todos',JSON.stringify(allTodos))
        createUi()
    }

    function handleToggle (event){
        let id =  event.target.dataset.id
        allTodos[id].isDone = !allTodos[id].isDone
        localStorage.setItem('todos',JSON.stringify(allTodos))
        createUi()
    }

    function createUi (data=allTodos){
        root.innerHTML = ""
        data.forEach((todo,i) => {
            let li = document.createElement("li")

            let input = document.createElement("input")
            input.type = "checkbox"
            input.checked = todo.isDone
            input.setAttribute("data-id",i)
            input.addEventListener('change',handleToggle)
        
            let p = document.createElement("p")
            p.innerText = todo.name
        
            let span = document.createElement("span")
            span.innerText = "❌"
            span.setAttribute("data-id",i)
            span.addEventListener('click',handleDelete)

            li.append(input,p,span)

            root.append(li)
        })
    }

    createUi()

    clear.addEventListener("click", () => {
        allTodos = allTodos.filter(todo => !todo.isDone)
        createUi()
        localStorage.setItem('todos',JSON.stringify(allTodos))
        createUi()
    })

    active.addEventListener("click" , () => {
        let notCompleted = allTodos.filter(todo => !todo.isDone)
        createUi(notCompleted)
        activeButton = "active"
        updateActiveButton()
    })

    completed.addEventListener("click" , () => {
        let completedTodos = allTodos.filter(todo => todo.isDone)
        createUi(completedTodos)
        activeButton = "completed"
        updateActiveButton()
    })

    all.addEventListener("click" , () => {
        createUi()
        activeButton = "all"
        updateActiveButton()
    })


    function updateActiveButton(btn = activeButton){
        all.classList.remove("selected")
        active.classList.remove("selected")
        completed.classList.remove("selected")

        if(btn === "all"){
            all.classList.add("selected")
        }
        if(btn === "active"){
            active.classList.add("selected")
        }
        if(btn === "completed"){
            completed.classList.add("selected")
        }
    }

    updateActiveButton()

    input.addEventListener("keyup", handleInput)
}

main()