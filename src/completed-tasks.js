function completedTasks() {
    const completedTaskPage = document.createElement('div');
    const toolContainer = document.createElement('div');
    const tasksContainer = document.createElement('div');

    const clearAllTasksBtnContainer = document.createElement('div');
    const clearAllTasksBtn = document.createElement('button');

    completedTaskPage.setAttribute('id' ,'completedTaskPage');
    toolContainer.classList.add('tool-container');
    tasksContainer.classList.add('tasks-container');
    clearAllTasksBtnContainer.classList.add('clear-all-task-btn-container');
    clearAllTasksBtnContainer.classList.add('flex-container');
    clearAllTasksBtn.classList.add('clear-all-task-btn');

    clearAllTasksBtn.innerText = 'Clear All';

    completedTaskPage.appendChild(toolContainer);
    completedTaskPage.appendChild(tasksContainer);
    toolContainer.appendChild(clearAllTasksBtnContainer);
    const separator = document.createElement('span');
    separator.classList.add('separator');
    
    separator.textContent = 'Completed Tasks';
    tasksContainer.appendChild(separator);
    clearAllTasksBtnContainer.appendChild(clearAllTasksBtn);
    const content = document.querySelector('#content')
    content.appendChild(completedTaskPage);

    clearAllTasksBtn.addEventListener('click', () => {
        //clearAllTasks();
        callConfirmationDialog();
    })

    function clearAllTasks() {
        localStorage.removeItem('completed tasks')
        const alltasks = document.querySelectorAll('div.completed-task-container');
        alltasks.forEach(task => {
            task.remove();
        });
    }

    function callConfirmationDialog() {
        const task = document.querySelector('div.completed-task-container')
        const dialog = document.querySelector('dialog.dialog');
        if (task) {
            console.log(task);
            dialog.showModal();
        }
    }

    function createConfirmationDialog() {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');
        const closeBtnContainer = document.createElement('div');
        const closeBtn = document.createElement('button');
        const msgContainer = document.createElement('div');
        const msg = document.createElement('p');
        const confirmationBtnContainer = document.createElement('div');
        const cancelBtn = document.createElement('button');
        const okBtn = document.createElement('button');

        dialog.classList.add('dialog');
        form.classList.add('form');
        closeBtnContainer.classList.add('close-btn-container');
        closeBtn.classList.add('close-btn');
        closeBtn.setAttribute('value', 'cancel');
        closeBtn.setAttribute('formmethod', 'dialog')
        msgContainer.classList.add('msg-container');
        msg.classList.add('msg');
        confirmationBtnContainer.classList.add('confirmation-btn-container');
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.setAttribute('value', 'cancel');
        cancelBtn.setAttribute('formmethod', 'dialog')
        okBtn.classList.add('ok-btn');
        okBtn.setAttribute('value', 'default');


        closeBtn.textContent = 'X';
        msg.innerText = 'Do you want to clear all completed tasks?';
        cancelBtn.innerText = 'Cancel';
        okBtn.innerText = 'Yes';

        dialog.appendChild(form);
        form.appendChild(closeBtnContainer);
        form.appendChild(msgContainer);
        form.appendChild(confirmationBtnContainer);
        closeBtnContainer.appendChild(closeBtn)
        msgContainer.appendChild(msg);
        confirmationBtnContainer.appendChild(cancelBtn);
        confirmationBtnContainer.appendChild(okBtn);
        const content = document.querySelector('#content');
        content.appendChild(dialog);


        okBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearAllTasks();
            dialog.close();
        })

        cancelBtn.addEventListener('click', () => {
            dialog.close();
        })
    }

    createConfirmationDialog();

    function task(taskValue) {
        const taskContainer = document.createElement('div');
        // const checkbox = document.createElement('input');
        const taskText = document.createElement('p');
        const removeTaskBtn = document.createElement('button');
    
        taskContainer.classList.add('completed-task-container');
        // checkbox.classList.add('checkbox');
        taskText.classList.add('completed-task-text');
        removeTaskBtn.classList.add('remove-task-btn');;
    
        taskText.textContent = taskValue;
        //checkbox.setAttribute('type', 'checkbox')
        //checkbox.setAttribute('name', 'checkbox');
        
        removeTaskBtn.textContent = 'ˣ';
        
        //taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(removeTaskBtn);
        tasksContainer.appendChild(taskContainer);
        
        
        const currentTodo = taskText.textContent;
        removeTaskBtn.addEventListener('click', () => {
            removeTaskPermanently(taskContainer, currentTodo);
        })
    }

    function removeTaskPermanently(taskContainer, currentTodo) {
        removeTodofromTodolist(currentTodo);
        removeSavedTodo(currentTodo)
        taskContainer.remove()    
    }
    
    function removeTodofromTodolist(currentTodo) {
        const removedTaskIndex = completedTasklist.findIndex(({ taskContent }) => taskContent === currentTodo );
        completedTasklist.splice(removedTaskIndex, 1);
    }
    
    function removeSavedTodo(currentTodo) {
        const SAVED_TODOS= JSON.parse(localStorage.getItem('completed tasks'));
        for (let TODO in SAVED_TODOS) {
            if(SAVED_TODOS[TODO].taskContent === currentTodo) {
                localStorage.removeItem('completed tasks');
                saveTodo();
            } else { }
        }
    }

    const completedTasklist = []
    
    function saveTodo() { 
        localStorage.setItem(`available tasks`, JSON.stringify(completedTasklist));
    }

    function addTaskInDOM() {
        const lastElementIndex = completedTasklist.length - 1;
        const taskText = completedTasklist[lastElementIndex].taskContent;
        task(taskText);
    }

    class CompletedTask {
        constructor(taskContent) {
            this.taskContent = taskContent;
        }
        get getCompletedTask() {
            this._taskContent = taskContent;
        }
    }

    const availableCompletedTodos = JSON.parse(localStorage.getItem('completed tasks'));
    if (availableCompletedTodos != null) {
        for (const completedTodo in availableCompletedTodos) {
            const taskValue = availableCompletedTodos[completedTodo].taskContent;
            const newCompletedTodo = new CompletedTask(taskValue);
            completedTasklist.push(newCompletedTodo);
            addTaskInDOM()
        }
    }
}

export { completedTasks };