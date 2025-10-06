import '../styles/todo.css'
import todoPopup from './todoPopup.html'
import { PRIORITY } from '../logic/todo';
import { renderProject } from './projects';
import { save } from '../save';

export function createDOMTodoRow(project, todo){
    const div = document.createElement('div')
    const h2 = document.createElement('p');
    const done = document.createElement('input')
    h2.textContent = todo.getTitle()
    done.type = 'checkbox'

    done.addEventListener('click', event => {
        event.stopPropagation()
        todo.toggleDone()
        console.log(todo)
        save()
    })

    if(todo.isDone()) done.checked = true;
    if(todo.getDueDate()){
        h2.textContent += ` (due: ${todo.getDueDate()})` 
    }

    div.className = 'todo-row'
    h2.className = 'todo-row__title'

    div.appendChild(done)
    div.appendChild(h2)

    div.addEventListener('click', event => {
        renderTodoPopup(project, todo)
    })

    const remove = document.createElement('button')
    remove.className = 'todo-row__remove'
    remove.textContent = "Delete"
    remove.addEventListener('click', event =>{
        event.stopPropagation()
        project.remove(todo)
        renderProject(project)
        save()
    })

    div.appendChild(remove)

    return div;
}

export function renderTodoPopup(project, todo){
    const div = document.createElement('div');
    div.innerHTML = todoPopup;
    const dialog = div.firstElementChild

    const prioritySelect = dialog.querySelector('#priority');
    for(const priority in PRIORITY){
        const option = document.createElement('option')
        option.value = PRIORITY[priority]
        option.textContent = priority.toLowerCase()
        if(PRIORITY[priority] == PRIORITY.LOW){
            option.selected = true;
        }
        prioritySelect.appendChild(option)
    }

    const title = dialog.querySelector('#title')
    const description = dialog.querySelector('#description')
    const dueDate = dialog.querySelector('#dueDate')
    const priority = dialog.querySelector('#priority')
    
    if(todo){
        title.value = todo.getTitle() ?? ''
        description.value = todo.getDescription() ?? ''
        dueDate.value = todo.getDueDate() ?? ''
        priority.selectedIndex = todo.getPriority()
    }

    dialog.querySelector('.todo-popup__cancel').addEventListener('click', event => {
        // event.preventDefault();
        dialog.close()
    })

    dialog.querySelector('.todo-popup__save').addEventListener('click', event => {

        const obj = {
            title:title.value,
            description:description.value,
            dueDate:dueDate.value,
            priority:priority.value,
        }

        if(todo){
            todo.setTitle(title.value)
            todo.setDescription(description.value)
            todo.setDueDate(dueDate.value)
            todo.setPriority(priority.value)
        } else {
            project.add(obj)
        }

        save()
        renderProject(project)
        dialog.close()
    })

    document.body.appendChild(dialog)
    dialog.showModal()
}