import {home} from './home.js'
import './style.css'
import { todo } from './todo.js';
import { projects } from './projects.js';
import { projectFile } from './project-file.js';
home();


const todoBtn = document.querySelector('.todo-btn');
const projectsBtn = document.querySelector('.project-btn');

const btns = [todoBtn, projectsBtn];

let defaultTab = '';

function tabSwitcher(defaultTab) {
   const todoPage = document.querySelector('#todoPage');
   const projectPage = document.querySelector('#projectPage');
    switch(defaultTab) {
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
        default:
            todo();
            break;
    }
}
tabSwitcher();

function rmTabs(defaultTab) {
    if (defaultTab === 'todo' && defaultTab !== 'projects') {
        const projectPage = document.querySelector('#projectPage');
        if (projectPage !== null) {
            projectPage.remove()
        } else { }
    } else if (defaultTab === 'projects' && defaultTab !== 'todo') {
        const todoPage = document.querySelector("#todoPage");
        if (todoPage !== null) {
            todoPage.remove();
        }
    } else {};
}
 
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let currentTab = defaultTab;
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
                break;        
            default:
                break;
        }
    })
});



// function code() {
//     const projectIcon = document.querySelector('img');
//     projectIcon.addEventListener('click', () => {
//         console.log('icon');
//     })
// }

// setTimeout(code, 5*1000)

