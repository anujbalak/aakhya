
/////////////////////////// home /////////////////////


import { format } from 'date-fns';

function home() {
    const header = document.createElement('header');
    const dirContainer = document.createElement('div');
    const title = document.createElement('div');
    const dirName = document.createElement('p');
    const dateContainer = document.createElement('div');
    const currentTime = document.createElement('span');
    const presentDate = document.createElement('p');
    const navContainer = document.createElement('div');
    const todoBtnContainer = document.createElement('div');
    const todoBtn = document.createElement('button');
    const projectBtnContainer = document.createElement('div');
    const projectBtn = document.createElement('button');
    const completedTasksBtnContainer = document.createElement('div');
    const completedTasksBtn = document.createElement('button');
    const content = document.createElement('content');


    header.classList.add('header', 'flex-container');
    dirContainer.classList.add('dir-container');
    title.classList.add('title-text');
    dirName.classList.add('dirName');
    dateContainer.classList.add('date-container');
    currentTime.classList.add('current-time');
    presentDate.classList.add('present-date');
    navContainer.classList.add('nav-container','flex-container');
    todoBtnContainer.classList.add('todo-btn-container');
    todoBtn.classList.add('todo-btn');
    projectBtnContainer.classList.add('project-btn-container');
    projectBtn.classList.add('project-btn');
    completedTasksBtnContainer.classList.add('completed-task-btn-container')
    completedTasksBtn.classList.add('completed-tasks-btn')
    content.setAttribute('id', 'content');

    title.textContent = 'aakhya';
    dirName.textContent = '/todos'
    // let liveTime =  getCurrentTime()
    // currentTime.textContent = liveTime;
    // let today = format(new Date(), "dd/MM/yyyy");
    // presentDate.textContent = today;`
    window.reload = getCurrentTime();
    setInterval(getCurrentTime, 1000);
    todoBtn.textContent = 'Todo';
    projectBtn.textContent = 'Projects'
    completedTasksBtn.innerHTML = 'Completed Tasks'

    header.appendChild(dirContainer);
    header.appendChild(dateContainer);
    dirContainer.appendChild(title);
    dirContainer.appendChild(dirName);
    dateContainer.appendChild(currentTime);
    dateContainer.appendChild(presentDate);
    navContainer.appendChild(todoBtnContainer);
    navContainer.appendChild(projectBtnContainer);
    navContainer.appendChild(completedTasksBtnContainer);
    todoBtnContainer.appendChild(todoBtn);
    projectBtnContainer.appendChild(projectBtn);
    completedTasksBtnContainer.appendChild(completedTasksBtn);

    document.body.appendChild(header);
    document.body.appendChild(navContainer);
    document.body.appendChild(content);


    function getCurrentTime() {
        let liveTime = format(new Date(), 'hh:mm:ss');
        currentTime.textContent = liveTime;
        let today = format(new Date(), "dd/MM/yyyy");
        presentDate.textContent = today;
    };

    todoBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576');
    const currentPage = [todoBtn, projectBtn, completedTasksBtn];

    currentPage.forEach(page => {
        page.addEventListener('click', () => {
            switch (page) {
                case todoBtn:
                    dirName.textContent = '/todos';
                    changeBottomBorder(todoBtn);
                    break;
                case projectBtn:
                    dirName.textContent = '/projects'
                    changeBottomBorder(projectBtn);
                    break;
                case completedTasksBtn:
                    dirName.innerText = '/Completed Tasks'
                    changeBottomBorder()
                default:
                    dirName.textContent = '/todos';
                    break;
            }
        })
        
    });

    function changeBottomBorder(currentPage) {
        if (currentPage == projectBtn) {
            todoBtn.setAttribute('style', 'border-bottom: none;');
            projectBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576');
            completedTasksBtn.setAttribute('style', 'border-bottom: none;')
        } else if (currentPage == todoBtn) {
            projectBtn.setAttribute('style', 'border-bottom: none;');
            todoBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576');
            completedTasksBtn.setAttribute('style', 'border-bottom: none;')
        } else {
            projectBtn.setAttribute('style', 'border-bottom: none;');
            todoBtn.setAttribute('style', 'border-bottom: none;');
            completedTasksBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576')
        }
    };

}

export {home}