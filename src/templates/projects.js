import "../styles/projects.css"
import { createDOMTodoRow, renderTodoPopup } from "./todo.js";

function createDOMProjectCard(project){
    const div = document.createElement('div')
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    div.className = 'projects-card'
    h2.className = 'projects-card__title'
    p.className = 'projects-card__p'

    div.appendChild(h2);
    div.appendChild(p);

    h2.textContent = project.getTitle();
    const length = project.length();
    p.textContent = length == 0 ? 'Empty' : `${length} tasks`

    div.addEventListener('click', event => {
        renderProject(project)
    })

    return div
}

export function renderProject(project){
    const content = document.querySelector('#content');
    document.querySelector('#main__title').textContent = `Project - ${project.getTitle()} `

    const div = document.createElement('div')
    for(const todo of project.getTodos()){
        const todoElement = createDOMTodoRow(project, todo)
        div.appendChild(todoElement);
    }
    const addTask = document.createElement('button')
    addTask.className = 'project__add'
    addTask.textContent = '+ Add Task'
    addTask.addEventListener('click', event => {
        renderTodoPopup(project)
    })
    div.appendChild(addTask)
    content.innerHTML = '';
    content.appendChild(div)
}

export function renderProjects(projectManager){
    const content = document.querySelector('#content');
    const div = document.createElement('div');
    div.className = 'projects-board'
    for(const project of projectManager.getProjects()){
        const card = createDOMProjectCard(project)
        div.appendChild(card)
    }
    document.querySelector('#main__title').textContent = 'My Projects'
    content.innerHTML = '';
    content.appendChild(div);
}