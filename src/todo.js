function todo() {
    const todoPage = document.createElement('div');
    const newTodoContainer = document.createElement('div');
    const newTodo = document.createElement('textarea')
    const placeHolder = document.createElement('span');
    const addBtn = document.createElement('button');
    const dividerLine = document.createElement('hr');
    const todoList = document.createElement('div');

    todoPage.setAttribute('id', 'todoPage');
    newTodoContainer.classList.add('newTodo-container', 'grid-container');
    newTodo.setAttribute("name", 'newTodo');
    newTodo.setAttribute('id', 'newTodo');
    newTodo.setAttribute('placeholder', 'Add your new todo here...')
    placeHolder.setAttribute('id', 'placeholder');
    addBtn.textContent = '+';
    addBtn.setAttribute('id', 'addBtn');
    todoList.classList.add('todolist');

    todoPage.appendChild(newTodoContainer);
    newTodoContainer.appendChild(placeHolder);
    newTodoContainer.appendChild(newTodo);
    todoPage.appendChild(addBtn);
    todoPage.appendChild(dividerLine);
    todoPage.appendChild(todoList);

    const content = document.querySelector('#content')
    content.appendChild(todoPage);

    newTodo.oninput = function() {
        newTodo.style.height = '';
        newTodo.style.height = Math.min(newTodo.scrollHeight, 200) + 'px';
    }

    let tasklist = [];
    let completedTasklist = []

    class Task {
        constructor(taskContent, taskStatus) {
            this.taskContent = taskContent;
            // this.taskStatus = taskStatus;
        }
        get getTask() {
            this._taskContent = taskContent;
            // this._taskStatus = taskStatus;
        };
    };

    class CompletedTask {
        constructor(taskContent) {
            this.taskContent = taskContent;
        }
        get getCompletedTask() {
            this._taskContent = taskContent;
        }
    }

    function task(taskValue) {
        const taskContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        const taskText = document.createElement('p');
        const removeTaskBtn = document.createElement('button');
    
        taskContainer.classList.add('task-container');
        checkbox.classList.add('checkbox');
        taskText.classList.add('task-text');
        removeTaskBtn.classList.add('remove-task-btn');;
    
        taskText.textContent = taskValue;
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('name', 'checkbox');
        removeTaskBtn.textContent = 'ˣ';
        
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(removeTaskBtn);
        todoList.appendChild(taskContainer);
        
        switchCheckboxStatus(checkbox, taskText)
        
        const currentTodo = taskText.textContent;
        removeTaskBtn.addEventListener('click', () => {
            removeTodo(taskContainer, currentTodo);
        })
    }

    function switchCheckboxStatus(checkbox, taskText) {
        let isChecked = false;
        checkbox.addEventListener('click', () => {
            switch (isChecked) {
                case true:
                    isChecked = false;
                    break;
                case false:
                    isChecked = true;
                    break;
                default:
                    isChecked = false;
                break;
            }
            let taskStatus = getTaskStatus(isChecked);
            removeCompletedTasks(taskStatus, taskText.textContent)
            styleCheckbox(isChecked, taskText);
        })
    }
    
    function removeCompletedTasks(taskStatus, taskContent) {
        if (taskStatus === true) {
            updateCompletedTasklist(taskContent)
            saveCompletedTasksInStorage();
            removeTodofromTodolist(taskContent);
            removeSavedTodo(taskContent);
        }
    }

    function updateCompletedTasklist(taskContent) {
        const task = new CompletedTask(taskContent);
        completedTasklist.push(task);
    }

    function saveCompletedTasksInStorage() {
        localStorage.setItem('completed tasks', JSON.stringify(completedTasklist))
        console.log(completedTasklist);
    }
    
    function getTaskStatus(isChecked) {
        return isChecked;
    }

    function styleCheckbox(checkedValue, taskText) {
        if (checkedValue == true) {
            taskText.setAttribute('style', 'text-decoration: line-through; font-style: italic; opacity:50%')
        } else {
            taskText.setAttribute('style', '');
        }
    }

    function removeTodo(taskContainer, currentTodo) {
        removeTodofromTodolist(currentTodo);
        removeSavedTodo(currentTodo)
        taskContainer.remove()    
    }
    
    function removeTodofromTodolist(currentTodo) {
        const removedTaskIndex = tasklist.findIndex(({ taskContent }) => taskContent === currentTodo );
        tasklist.splice(removedTaskIndex, 1);
    }
    
    function removeSavedTodo(currentTodo) {
        const SAVED_TODOS= JSON.parse(localStorage.getItem('general todos'));
        for (let TODO in SAVED_TODOS) {
            if(SAVED_TODOS[TODO].taskContent === currentTodo) {
                localStorage.removeItem('general todos');
                saveTodo();
            } else { }
        }
        
    }
    
    function addTaskInDOM() {
        const lastElementIndex = tasklist.length - 1;
        const taskText = tasklist[lastElementIndex].taskContent;
        task(taskText);
    }
    
    let currentTodos = 0
    function saveTodo(taskText) { 
        localStorage.setItem('general todos', JSON.stringify(tasklist));
        currentTodos += 1;
    }
    

    ////////////// load available todos
    // window.onload = (event) => {
        const availableTodos = JSON.parse(localStorage.getItem('general todos'));
        if (availableTodos.length > 0) {
            for (const todo in availableTodos) {
                const taskValue = availableTodos[todo].taskContent
                const newtask = new Task(taskValue);
                tasklist.push(newtask);
                addTaskInDOM();
            }
        }
    // };

    //////// load completed todos

    const availableCompletedTodos = JSON.parse(localStorage.getItem('completed tasks'));
    if (availableCompletedTodos.length > 0) {
        for (const completedTodo in availableCompletedTodos) {
            const taskValue = availableCompletedTodos[completedTodo].taskContent;
            const newCompletedTodo = new CompletedTask(taskValue);
            completedTasklist.push(newCompletedTodo);
        }
    }
    
    function updateTasklist() {
        const newTask = new Task(newTodo.value);
        tasklist.push(newTask);
    }

    function createNewTask() {
        addBtn.addEventListener('click', () => {
            if (newTodo.value === null || newTodo.value === undefined || newTodo.value === '') {
                newTodo.setAttribute('placeholder', 'Write a todo first');
                newTodo.style.setProperty('--col', '#ff8576')
            } else {
                newTodo.setAttribute('placeholder', 'Add your todo here...');
                newTodo.style.setProperty('--col', '#eee')
                updateTasklist();
                saveTodo(newTodo.value)
                addTaskInDOM();
                newTodo.value = '';
            }
        })
    }
    createNewTask();
}

export {todo};