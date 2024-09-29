
/////////////////////////// home /////////////////////


import { format } from 'date-fns';

function home() {
    const header = document.createElement('header');
    const dirContainer = document.createElement('div');
    const title = document.createElement('div');
    const dirName = document.createElement('p');
    const dateContainer = document.createElement('div');
    const presentDate = document.createElement('p');
    const navContainer = document.createElement('div');
    const todoBtnContainer = document.createElement('div');
    const todoBtn = document.createElement('button');
    const projectBtnContainer = document.createElement('div');
    const projectBtn = document.createElement('button');
    const content = document.createElement('content');


    header.classList.add('header', 'flex-container');
    dirContainer.classList.add('dir-container');
    title.classList.add('title-text');
    dirName.classList.add('dirName');
    dateContainer.classList.add('date-container');
    presentDate.classList.add('present-date');
    navContainer.classList.add('nav-container','flex-container');
    todoBtnContainer.classList.add('todo-btn-container');
    todoBtn.classList.add('todo-btn');
    projectBtnContainer.classList.add('project-btn-container');
    projectBtn.classList.add('project-btn');
    content.setAttribute('id', 'content');

    title.textContent = 'aakhya';
    dirName.textContent = '/todos'
    let today = format(new Date(), "dd/MM/yyyy");
    presentDate.textContent = today;
    todoBtn.textContent = 'Todo';
    projectBtn.textContent = 'Projects'


    header.appendChild(dirContainer);
    header.appendChild(dateContainer);
    dirContainer.appendChild(title);
    dirContainer.appendChild(dirName);
    dateContainer.appendChild(presentDate);
    navContainer.appendChild(todoBtnContainer);
    navContainer.appendChild(projectBtnContainer);
    todoBtnContainer.appendChild(todoBtn);
    projectBtnContainer.appendChild(projectBtn);

    document.body.appendChild(header);
    document.body.appendChild(navContainer);
    document.body.appendChild(content);


    todoBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576');
    const currentPage = [todoBtn, projectBtn];

    currentPage.forEach(page => {
        page.addEventListener('click', () => {
            switch (page) {
                case todoBtn:
                    dirName.textContent = '/todos';
                    changeBottomBorder();
                    break;
                case projectBtn:
                    console.log('project button clicked')
                    dirName.textContent = '/projects'
                    changeBottomBorder(projectBtn);
                    break;
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
        } else {
            projectBtn.setAttribute('style', 'border-bottom: none;');
            todoBtn.setAttribute('style', 'border-bottom: solid 2px #ff8576');
        };
    };

}

export {home}