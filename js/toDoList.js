
const input = document.querySelector(".toDo__input");
const inputEdit = document.querySelector(".toDo__input_hidden");
const btnAdd = document.querySelector(".toDo__btnAdd");
const btnSafe = document.querySelector(".toDo__btnSafe");
const toDoList = document.querySelector(".toDo__list");
const btnClear = document.querySelector(".toDo__clearBtn");
const btnEdit = document.querySelector(".toDo__iconEdit");
const btnDel = document.querySelector(".toDo__iconDel");

let toDoTasks = [];

const createTask = () => {
    const toDo = localStorage.getItem("todo");
    if (toDo === null) {
        toDoTasks = [];
    } else {
        toDoTasks = JSON.parse(toDo);
    }
    let task = '';
    toDoTasks.forEach((item,index) => {
        task += `<li class = "toDo__item">
        <p>${item}</p>
        <div class = "toDo__icons">
            <button onclick ="editTask(${index})" class = "toDo__iconEdit"></button>
            <button onclick ="delTask(${index})" class = "toDo__iconDel"></button>
        </div>
        </li>`
    });
    toDoList.innerHTML = task;
}

const delTask = index => {
    let toDo = localStorage.getItem("todo");
    toDoTasks = JSON.parse(toDo);
    toDoTasks.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(toDoTasks));
    createTask();
}

const editTask = index=> {
    inputEdit.value = index;
    let toDo = localStorage.getItem("todo");
    toDoTasks = JSON.parse(toDo);
    input.value = toDoTasks[index];
    btnAdd.classList.add('hidden');
    btnSafe.classList.add('active');
}

input.addEventListener('keydown', event => {
    if( event.code == 'Enter'){
        if (input.value == ""){
            input.classList.add('emptyValue');
        } else{
            let toDo = localStorage.getItem("todo");
                if (toDo === null) {
                toDoTasks = [];
            } else {
                toDoTasks = JSON.parse(toDo);
            }
            toDoTasks.push(input.value);
            input.value = '';
            input.classList.remove('emptyValue');
            localStorage.setItem("todo", JSON.stringify(toDoTasks));
            createTask();
        }
    }
});

btnAdd.addEventListener('click',() =>{
    if (input.value == ''){
        input.classList.add('emptyValue');
    } else{
        let toDo = localStorage.getItem("todo");
            if (toDo === null) {
            toDoTasks = [];
        } else {
            toDoTasks = JSON.parse(toDo);
        }
        toDoTasks.push(input.value);
        input.value = '';
        input.classList.remove('emptyValue');
        localStorage.setItem("todo", JSON.stringify(toDoTasks));
        createTask();
    }
    
}); 

btnSafe.addEventListener('click', () => {
    if (input.value == ''){
        let id = inputEdit.value;
        btnAdd.classList.remove('hidden');
        btnSafe.classList.remove('active');
        delTask(id);
    } else{
        let toDo = localStorage.getItem("todo");
        toDoTasks = JSON.parse(toDo);
        let id = inputEdit.value;
        toDoTasks[id] = input.value;
        btnAdd.classList.remove('hidden');
        btnSafe.classList.remove('active');
        input.value = '';
        localStorage.setItem("todo", JSON.stringify(toDoTasks));
        input.classList.remove('emptyValue');
        createTask();
    }
});

const deleteAll = selector => {
    let elements = document.querySelectorAll(selector);
    elements.forEach(el => el.remove(selector));
}
btnClear.addEventListener('click', () => {
    deleteAll('.toDo__item');
    localStorage.clear();
});

document.addEventListener("DOMContentLoaded", createTask)






