function projectFile() {
    const projectFilePage = document.createElement('div');
    const newTodoContainer = document.createElement('div');
    const newTodo = document.createElement('textarea')
    const placeHolder = document.createElement('span');
    const addBtn = document.createElement('button');
    const dividerLine = document.createElement('hr');
    const todoList = document.createElement('div');

    projectFilePage.setAttribute('id', 'projectFilePage');
    newTodoContainer.classList.add('newTodo-container', 'grid-container');
    newTodo.setAttribute("name", 'newTodo');
    newTodo.setAttribute('id', 'newTodo');
    newTodo.setAttribute('placeholder', 'Add your new todo here...')
    placeHolder.setAttribute('id', 'placeholder');
    addBtn.textContent = '+';
    addBtn.setAttribute('id', 'addBtn');
    todoList.classList.add('todolist');

    projectFilePage.appendChild(newTodoContainer);
    newTodoContainer.appendChild(placeHolder);
    newTodoContainer.appendChild(newTodo);
    projectFilePage.appendChild(addBtn);
    projectFilePage.appendChild(dividerLine);
    projectFilePage.appendChild(todoList);

    const content = document.querySelector('#content')
    content.appendChild(projectFilePage);

    newTodo.oninput = function() {
        newTodo.style.height = '';
        newTodo.style.height = Math.min(newTodo.scrollHeight, 200) + 'px';
    }

    let tasklist = [];

    class Task {
        constructor(taskContent) {
            this.taskContent = taskContent;
        }
        get getTask() {
            this._taskContent = taskContent;
        };
    };

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
            return checkboxState(isChecked);
        })

        function checkboxState(checkedValue) {
            if (checkedValue == true) {
                taskText.setAttribute('style', 'text-decoration: line-through; font-style: italic; opacity:50%')
            } else {
                taskText.setAttribute('style', '');
            }
        }
        
        removeTaskBtn.addEventListener('click', () => {
            taskContainer.remove()    
            const removedTaskIndex = tasklist.findIndex(({ taskContent }) => taskContent === taskText.textContent );
            tasklist.splice(removedTaskIndex, 1);
        })
    }
    
    function addTaskInDOM() {
        const lastElementIndex = tasklist.length - 1;
        const taskText = tasklist[lastElementIndex].taskContent;
        task(taskText);
        console.log(tasklist[0])
    }

    function createNewTask() {
        addBtn.addEventListener('click', () => {
            if (newTodo.value === null || newTodo.value === undefined || newTodo.value === '') {
                newTodo.setAttribute('placeholder', 'Write a todo first');
                newTodo.style.setProperty('--col', '#ff8576')
            } else {
                newTodo.setAttribute('placeholder', 'Add your todo here...');
                newTodo.style.setProperty('--col', '#eee')
                const newTask = new Task(newTodo.value);
                tasklist.push(newTask);
                console.log(tasklist);
                addTaskInDOM();
                newTodo.value = '';
            }
        })
    }
    createNewTask();
}

export { projectFile };