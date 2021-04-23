        
        // To-Do

let todoForm = document.querySelector('.todo-form')
let todoInput = document.querySelector('.todo-input')
let todoList = document.querySelector('.todo-list')

todoForm.addEventListener('submit', function (event) {
    event.preventDefault()
    addTodo(todoInput.value)
})

let todos = []
function addTodo(item) {
    if (item !== '') {
        let todo = {
            id: Date.now(),
            name: item,
            completed: false
        }
        todos.push(todo)
        addToLocalStorage(todos)
        todoInput.value = ""
    } else {
        alert('todo tidak boleh kosong')
    }
}


function renderTodos(todos) {
    todoItemsList.innerHTML = ''

    todos.forEach(item => {
        const li = document.createElement('li')
        li.setAttribute('class', 'item')
        li.setAttribute('data-key', item.id)
        if (item.completed === true) {
            li.classList.add('checked')
        }

        let checked;
        if (item.completed) {
            checked = 'checked'
        } else {
            checked = null
        }

        li.innerHTML = `
        <input class="checkbox" type="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">x</button>
        `
        todoItemsList.append(li)
    });
}

function addToLocalStorage(todos) {
    let dataJSON = JSON.stringify(todos)
    localStorage.setItem('todos', dataJSON)
    renderTodos(todos)
}

function toggle(id) {
    todos.forEach(item => {
        if (item.id == id) {
            item.completed = !item.completed
        }
    })
    addToLocalStorage(todos)
}


function deleteTodo(id) {

    todos = todos.filter(function (item) {
        return item.id != id
    })

    addToLocalStorage(todos)
}

todoList.addEventListener('click', function (event) {

    let id = event.target.parentElement.getAttribute('data-key')
    console.log(id)

    if (event.target.type === 'checkbox') {
        toggle(id)
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(id)
    }
})

function getFromLocalStorage() {
    let ref = localStorage.getItem('todos')
    if (ref) {
        todos = JSON.parse(ref)
        renderTodos(todos)
    }
}
getFromLocalStorage()

