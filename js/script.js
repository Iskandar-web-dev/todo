let list = document.querySelector('.list')
let form = document.forms.forma
let base_url = "http://localhost:9999"
let todos = [

]

const getAllData = async () => {
    try {
        const res = await fetch(base_url + "/todos")

        if (res.status === 200 || res.status === 201) {

            const data = await res.json()

            reload(data)
        }

    } catch(e) {
        alert('connection error!')
    }

}
getAllData()

let inp = document.querySelector("input")
function reload(arr) {
    // list.innerHTML = ''

    for (let item of arr) {
        //create
        let todo = document.createElement('div')
        let work = document.createElement('h2')
        let time = document.createElement('span')
        let rem = document.createElement('p')
        let edit = document.createElement('a')
        //styling
        todo.classList.add('todo')

        work.innerHTML = item.task
        time.innerHTML = item.time
        rem.innerHTML = 'X'
        edit.innerHTML = 'edit'
        edit.href = '#'
        //append
        todo.append(work, time, rem, edit)
        list.append(todo)

        let isDone
        work.onclick = async () => {
            const res = await fetch(base_url + "/todos/" + item.id, {
                method: "PATCH" ,
                body: JSON.stringify({
                    isDone: !item.isDone
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (res.status === 200 || res.status === 201) {
                if (item.isDone == false) {
                    work.classList.add('true')
                }
            }
        }
        edit.onclick = async (data) => {
            let editTask = prompt('Edit')
          
            const res = await fetch(base_url + "/todos/" + item.id, {
                method: "PATCH",
                body: JSON.stringify({
                    task: editTask
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (res.status === 200 || res.status === 201) {
                work.innerHTML = editTask
            }
        }


        rem.onclick = async () => {
            const res = await fetch(base_url + "/todos/" + item.id, {
                method: "delete"
            })
            if (res.status === 200 || res.status === 201) {
                todo.remove()
            }
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
        createNewTask(task)
    }


}

const createNewTask = async (body) => {
    try {
        const res = await fetch(base_url + "/todos", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (res.status === 200 || res.status === 201) {
            console.log(res)
        }
    } catch (e) {
        alert('error')
    }
}

