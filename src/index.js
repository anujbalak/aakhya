import {home} from './home.js'
import './style.css'
import { todo } from './todo.js';
import { projects } from './projects.js';
import { projectFile } from './project-file.js';
import { completedTasks } from './completed-tasks.js';
home();


const todoBtn = document.querySelector('.todo-btn');
const projectsBtn = document.querySelector('.project-btn');
const completedTaskBtn = document.querySelector('.completed-tasks-btn')

const btns = [todoBtn, projectsBtn, completedTaskBtn];

let currentTab = 'todo';

function tabSwitcher(currentTab) {
   const todoPage = document.querySelector('#todoPage');
   const projectPage = document.querySelector('#projectPage');
   const projectFilePage = document.querySelector('#projectFilePage')
   const completedTaskPage = document.querySelector('div#completedTaskPage') 
   switch(currentTab) {
        case 'todo':
            if (todoPage === null) {
                todo();
            }
            break;
        case 'projects':
            if (projectPage === null) {
                projects();
            }
            break;
        case 'project-file':
            if ( projectFilePage === null) {
                projectFile();
            }
            break;
        case 'completed-task-page':
            if (completedTaskPage === null) {
                completedTasks()
            }
            break;
        default:
            // todo();
            break;
    }
}
tabSwitcher(currentTab);

function rmTabs(currentTab) {
    const todoPage = document.querySelector("#todoPage");
    const projectPage = document.querySelector('#projectPage');
    const projectFilePage = document.querySelector('div#projectFilePage'); 
    const completedTaskPage = document.querySelector('div#completedTaskPage')

    if (currentTab === 'todo' && currentTab !== 'projects' && currentTab !== 'project-file' && currentTab !== 'completed-task-page') {
        if (projectPage !== null) {
            projectPage.remove()
        } else if (projectFilePage !== null) {
            projectFilePage.remove();
        } else if (completedTaskPage !== null) {
            completedTaskPage.remove()
        }
    } else if (currentTab === 'projects' && currentTab !== 'todo' && currentTab !== 'project-file' && currentTab !== 'completed-task-page') {
        if (todoPage !== null) {
            todoPage.remove();
        } else if (projectFilePage !== null) {
            projectFilePage.remove();
        } else if (completedTaskPage !== null) {
            completedTaskPage.remove()
        }
    } else if ( currentTab === 'project-file' && currentTab !== 'projects' && currentTab !== 'todo' && currentTab !== 'completed-task-page') {
        if (todoPage !== null) {
            todoPage.remove()
        } else if ( projectPage !== null) {
            projectPage.remove();
        } else if (completedTaskPage !== null) {
            completedTaskPage.remove()
        }

    } else if (currentTab !== 'project-file' && currentTab !== 'projects' && currentTab !== 'todo' && currentTab === 'completed-task-page' ) {
        if (todoPage !== null) {
            todoPage.remove()
        } else if ( projectPage !== null) {
            projectPage.remove();
        } else if (projectFilePage !== null) {
            projectFilePage.remove()
        }
    }
}
 
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        switch (btn) {
            case todoBtn:
                currentTab = 'todo';
                rmTabs(currentTab);
                tabSwitcher(currentTab);
                updateProjectNameBtn(currentTab);
                break;
            case projectsBtn:
                currentTab = 'projects';
                rmTabs(currentTab);
                tabSwitcher(currentTab);
                callProjectFile();
                updateFileList();
                updateProjectNameBtn(currentTab)
                break;
            case completedTaskBtn:
                currentTab = 'completed-task-page';
                rmTabs(currentTab);
                tabSwitcher(currentTab);        
                updateProjectNameBtn(currentTab);
            default:
                break;
        }
    })
});


function selectFolder() {
    const PROJECT_ICONS = document.querySelectorAll('img.project-icon');
    const PROJECT_NAMES = document.querySelectorAll('p.project-name');
    
    const PROJECT = [];
    PROJECT_ICONS.forEach(icon => {
        PROJECT.push(icon);
    })
    PROJECT_NAMES.forEach(name => {
        PROJECT.push(name);
    })
    return PROJECT;
}

function callProjectFile() {
    const AVAILABLE_PROJECTS = JSON.parse(localStorage.getItem('project names'));
    
    if (AVAILABLE_PROJECTS != null) {
        const FOLDER = selectFolder();
        FOLDER.forEach(project => {
            project.addEventListener('click', () => {
                loadProjectFile();
                updateDirName();
                updateProjectNameBtn();
            });
        })
    }
}


function updateDirName() {
    const dirName = document.querySelector('.dirName');
    dirName.textContent = `.../${localStorage.getItem('current-folder')}`;
    
}

function updateProjectNameBtn() {
    const projectBtn = document.querySelector('.project-btn');
    
    if (currentTab === 'todo') {
        projectBtn.textContent = 'Projects'    
    } else if ( currentTab === 'projects') {
        projectBtn.textContent = 'Projects'
    } else if ( currentTab === 'completed-task-page') {
        projectBtn.textContent = 'Projects'
    } else { 
        projectBtn.textContent = `Projects/${localStorage.getItem('current-folder')}`;
    };
}


function loadProjectFile() {
    currentTab = 'project-file';
    rmTabs(currentTab)
    tabSwitcher(currentTab);
}

function updateFileList() {
    const NEW_PROJECT_BTN = document.querySelector('button.new-project-btn');

    NEW_PROJECT_BTN.addEventListener('click', () => {
        const NEW_PROJECT_ADD_BTN = document.querySelector('button.add-new-project-btn');

        NEW_PROJECT_ADD_BTN.addEventListener('click', () => {
            callProjectFile();
        }); 
    }); 
}
