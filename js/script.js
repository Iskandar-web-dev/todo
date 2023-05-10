let list = document.querySelector('.list')
let form = document.forms.forma

let todos = [
    {
        id: 1,
        task: "buy kamron",
        time: "14:05",
        isDone: true
    },
    {
        id: 2,
        task: "do homework",
        time: "14:05",
        isDone: false
    }
]

reload(todos)

let inp = document.querySelector("input")
function reload(arr, place) {
    list.innerHTML = ' '

    for (let item of arr) {
        //create
        let todo = document.createElement('div')
        let work = document.createElement('h2')
        let time = document.createElement('span')
        let rem = document.createElement('p')

        //styling
        todo.classList.add('todo')

        work.innerHTML = item.task
        time.innerHTML = item.time
        rem.innerHTML = 'X'

        //append
        todo.append(work, time, rem)
        list.append(todo)

        if (item.isDone === true) {
            work.classList.add('true')
        }

        work.onclick = () => {
            item.isDone = !item.isDone

            reload(todos)
        }

        rem.onclick = () => {
            todo.style.opacity = 0
            todo.style.transition = '.5s ease'
            setTimeout(() => {
                todos = todos.filter(elem => elem.id != item.id)
                reload(todos)
            }, 500)
        }
    }
}
form.onsubmit = (event) => {
    event.preventDefault()

    if (inp.value.length === 0) {
        inp.style.transition = '.5s ease'
        inp.style.borderColor = 'red'
    } else {
        inp.style.borderColor = '#007FFF'
        inp.style.transition = '.5s ease'
        let task = {
            id: Math.random(),
            isDone: false,
            time: new Date().getHours() + ":" + new Date().getMinutes()
        }

        let fm = new FormData(form)

        fm.forEach((value, key) => {
            task[key] = value
        })
        todos.push(task);
        reload(todos, list)
        console.log(todos);
    }


}