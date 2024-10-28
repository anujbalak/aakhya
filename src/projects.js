import folderIcon from './assets/folder-logo.svg'
import { projectFile } from './project-file.js';

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
    
    class Project {
        constructor(projectContent) {
            this.projectContent = projectContent;
        }
        get getProject() {
            this._projectContent = projectContent;
        }
    }
    
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

        addNewProject(addNewProjectBtn, newProjectNameInput, newProjectContainer);

        updateCurrentFolderName(addNewProjectBtn)
    })
    
    
    function updateProjectList(projectName) {
        const newProject = new Project(projectName.value);
        projectList.push(newProject);
    }

    
    function changePlaceholder(isProjectNameNotExist, projectName) {
        switch (isProjectNameNotExist) {
            case true:
                projectName.setAttribute('placeholder', 'Project Name can not blank.')
                projectName.style.setProperty("--col", '#ff8576')
                break;
            case false:
                projectName.setAttribute('placeholder', 'Type a project name...')
                projectName.style.setProperty("--col", '#eee')
                break;
            default:
                break;
        }
    };
    
    // function removeProjectName(projectName) {
    //     projectName.value = '';
    // };
    
    function createNewProject(recentProjectName) {
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
        
        projectName.textContent = recentProjectName;
        deleteProjectBtn.textContent = 'X';
        
        projectContainer.appendChild(projectName);
        projectContainer.appendChild(deleteProjectBtn);
        
        existingProjectsContainer.appendChild(projectContainer);

        deleteProjectBtn.addEventListener('click', () => {
            removeProject(projectContainer, projectName);
        })

    }

    function removeProject(projectContainer, projectName) {
        removeProjectsFromProjectlist(projectName.textContent);
        removeSavedProjects(projectName.textContent)
        projectContainer.remove();

    }
    
    function removeProjectsFromProjectlist(projectName) {
        const removedProjectIndex = projectList.findIndex(({ projectContent }) => projectContent === projectName );
        projectList.splice(removedProjectIndex, 1);

    }

    function removeSavedProjects(projectName) {
        const SAVED_PROJECTS = JSON.parse(localStorage.getItem('project names'));
        for (let project in SAVED_PROJECTS) {
            if(SAVED_PROJECTS[project].projectContent === projectName) {
                localStorage.removeItem('project names');
                saveProjectName();
            }
        }
    }

    function checkBlankProjectName(projectName) {
        let isProjectNameBlank = true
        if(projectName.value === '' || projectName.value === undefined || projectName === null) {
            isProjectNameBlank = true;
        } else { 
            isProjectNameBlank = false
        };
        return isProjectNameBlank;
    }

    function activateAddProjectBtn(projectContainer) {
        projectContainer.remove();
        projectPage.appendChild(newProjectBtnContainer);
    }

    function addProjectInDOM() {
        const recentProjectIndex = projectList.length - 1;
        const recentProject = projectList[recentProjectIndex].projectContent;
        createNewProject(recentProject);
    }

    function saveProjectName() {
        localStorage.setItem('project names', JSON.stringify(projectList));
    }

    
    function addNewProject(addBtn, inputName, newProjectContainer) {
        addBtn.addEventListener('click', () => {
            const isProjectNameNotExist = checkBlankProjectName(inputName);
            changePlaceholder(isProjectNameNotExist, inputName);
            
            if (isProjectNameNotExist === false) {
                activateAddProjectBtn(newProjectContainer);
                // removeProjectName(inputName);
                updateProjectList(inputName);
                saveProjectName();
                addProjectInDOM();
            } else if (isProjectNameNotExist === true) {
                
            } else {
                
            }
        })
    };
    
    const separator = document.createElement('span');
    separator.classList.add('separator');
    
    separator.textContent = 'Existing Projects';
    projectPage.appendChild(separator);
    
    const existingProjectsContainer = document.createElement('div');
    existingProjectsContainer.classList.add('existing-projects-container');
    projectPage.appendChild(existingProjectsContainer);
    
    
    const availableProjects = JSON.parse(localStorage.getItem('project names'));
    if (availableProjects.length > 0) {
        for (let project in availableProjects) {
            const PROJECT_NAME = availableProjects[project].projectContent;
            const NEW_PROJECT = new Project(PROJECT_NAME);
            projectList.push(NEW_PROJECT);
            addProjectInDOM();
        }
    }

    function updateCurrentFolderName(addBtn) {
        addBtn.addEventListener('click', () => {
            currentFolder();
        })
    }

    function currentFolder() {
        const projectNodeList = document.querySelectorAll('p.project-name');
        projectNodeList.forEach((projectNode) => {
            const projectName = projectNode.textContent;
            projectNode.addEventListener('click', () => {
                localStorage.setItem(projectName, projectName);
                localStorage.setItem('current-folder',projectName)
            })
        });
    }
    currentFolder();
}

export { projects }