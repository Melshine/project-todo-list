import { ProjectManager } from "../logic/project.js";
import { save } from "../save.js";
import "../styles/projects.css"
import { createDOMTodoRow, renderTodoPopup } from "./todo.js";

function createDOMProjectCard(project){
    const div = document.createElement('div')
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const remove = document.createElement('button')
    remove.textContent = 'remove'

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

    h2.appendChild(remove)
    remove.addEventListener('click', event => {
        event.stopPropagation()
        ProjectManager.remove(project)
        renderProjects(ProjectManager)
        save()
    })

    return div
}

function createDOMAddProject(){
    const div = document.createElement('div')
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    div.className = 'projects-card'
    h2.className = 'projects-card__title'
    p.className = 'projects-card__p'

    h2.textContent = ' + New project'
    // p.textContent = 'Name: '

    const input = document.createElement('input')
    const button = document.createElement('button')
    button.textContent = 'create'

    button.addEventListener('click', event => {
        const title = input.value;
        ProjectManager.add({title, })
        save()
        renderProjects(ProjectManager)
    })

    div.appendChild(h2);
    div.appendChild(p);
    p.appendChild(input)
    p.appendChild(button)

    p.style.display = 'flex';
    input.style.flex = '1 1 0'
    input.style.width = "100px"

    div.style.background = "#eee";
    div.style.cursor = "auto"

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
    div.appendChild(createDOMAddProject())
    content.appendChild(div);
}