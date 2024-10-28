import {home} from './home.js'
import './style.css'
import { todo } from './todo.js';
import { projects } from './projects.js';
import { projectFile } from './project-file.js';
home();


const todoBtn = document.querySelector('.todo-btn');
const projectsBtn = document.querySelector('.project-btn');

const btns = [todoBtn, projectsBtn];

let currentTab = 'todo';

function tabSwitcher(currentTab) {
   const todoPage = document.querySelector('#todoPage');
   const projectPage = document.querySelector('#projectPage');
   const projectFilePage = document.querySelector('#projectFilePage')
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
    if (currentTab === 'todo' && currentTab !== 'projects' && currentTab !== 'project-file') {
        if (projectPage !== null) {
            projectPage.remove()
        } else if (projectFilePage !== null) {
            projectFilePage.remove();
        }
    } else if (currentTab === 'projects' && currentTab !== 'todo' && currentTab !== 'project-file') {
        if (todoPage !== null) {
            todoPage.remove();
        } else if (projectFilePage !== null) {
            projectFilePage.remove();
        }
    } else if ( currentTab === 'project-file' && currentTab !== 'projects' && currentTab !== 'todo') {
        if (todoPage !== null) {
            todoPage.remove()
        } else if ( projectPage !== null) {
            projectPage.remove();
        }

    };
}
 
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        switch (btn) {
            case todoBtn:
                currentTab = 'todo';
                rmTabs(currentTab);
                tabSwitcher(currentTab);
                break;
            case projectsBtn:
                currentTab = 'projects';
                rmTabs(currentTab);
                tabSwitcher(currentTab);
                callProjectFile();
                updateFileList();
                break;        
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
    
    if (AVAILABLE_PROJECTS.length > 0) {
        const FOLDER = selectFolder();
        FOLDER.forEach(project => {
            project.addEventListener('click', () => {
                loadProjectFile();
            });
        })
    }
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
