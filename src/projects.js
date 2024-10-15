import folderIcon from './assets/folder-logo.svg'

function projects() {

    const projectPage = document.createElement('div');
    const newProjectBtnContainer = document.createElement('div');
    const newProjectBtn = document.createElement('button');

    projectPage.setAttribute('id', 'projectPage');
    newProjectBtnContainer.classList.add('new-project-btn-container', 'flex-container');
    newProjectBtn.classList.add('new-project-btn');
    newProjectBtn.textContent = 'New Project';

    
    projectPage.appendChild(newProjectBtnContainer);
    newProjectBtnContainer.appendChild(newProjectBtn);
    const content = document.querySelector('#content')
    content.appendChild(projectPage);
    
    
    
    let projectList = []
    
    newProjectBtn.addEventListener('click', () => {
        newProjectBtnContainer.remove();
        const newProjectContainer = document.createElement('div');
        const newProjectNameInput = document.createElement('input');
        const addNewProjectBtn = document.createElement('button');
        
        newProjectContainer.classList.add('new-project-container');
        newProjectNameInput.setAttribute('id', 'new-project-name');
        newProjectNameInput.setAttribute('type', 'text');
        newProjectNameInput.setAttribute('placeholder', 'type a project name');
        newProjectNameInput.setAttribute('name', 'newProjectName');
        addNewProjectBtn.classList.add('add-new-project-btn');
        addNewProjectBtn.textContent = '+'

        newProjectContainer.appendChild(newProjectNameInput);
        newProjectContainer.appendChild(addNewProjectBtn);
        projectPage.appendChild(newProjectContainer);

        addNewProjectBtn.addEventListener('click', () => {
            createNewProject(newProjectNameInput);
        })
    })
    
    
    const separator = document.createElement('span');
    separator.classList.add('separator');
    
    separator.textContent = 'Existing Projects';
    projectPage.appendChild(separator);
    
    
    const existingProjectsContainer = document.createElement('div');
    existingProjectsContainer.classList.add('existing-projects-container');
    projectPage.appendChild(existingProjectsContainer);


    function createNewProject(newProjectNameInput) {
        const projectContainer = document.createElement('div');
        const projectName = document.createElement('p');
        const deleteProjectBtn = document.createElement('button');

        projectContainer.classList.add('project-container');
        projectName.classList.add('project-name');
        deleteProjectBtn.classList.add('delete-project-btn');

        const folder = new Image();
        folder.src = folderIcon;
        folder.classList.add('project-icon');
        projectContainer.appendChild(folder);
        
        projectName.textContent = newProjectNameInput.value;
        deleteProjectBtn.textContent = 'X';

        projectContainer.appendChild(projectName);
        projectContainer.appendChild(deleteProjectBtn);

        existingProjectsContainer.appendChild(projectContainer);

        deleteProjectBtn.addEventListener('click', () => {
            projectContainer.remove();
        })
    }
}

export { projects }