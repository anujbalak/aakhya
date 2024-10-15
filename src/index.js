import {home} from './home.js'
import './style.css'
import { todo } from './todo.js';
import { projects } from './projects.js';
home();


const todoBtn = document.querySelector('.todo-btn');
const projectsBtn = document.querySelector('.project-btn');

const btns = [todoBtn, projectsBtn];

let defaultTab = 'todo';

function tabSwitcher(defaultTab) {
    switch(defaultTab) {
        case 'todo':
            todo();
            break;
        case 'projects':
            projects();
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
        projectPage.remove()
    } else if (defaultTab === 'projects' && defaultTab !== 'todo') {
        const todoPage = document.querySelector("#todoPage");
        todoPage.remove();
        console.log('projects');
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