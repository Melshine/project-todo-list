import { ProjectManager } from "./logic/project";

export function save(pm = ProjectManager){
    const save = []
    for(const project of pm.getProjects()){
        const p = {
            title : project.getTitle(),
            todos : []
        };

        save.push(p);
        for(const todo of project.getTodos()){
            p.todos.push({
                title: todo.getTitle(),
                description:todo.getDescription(),
                dueDate:todo.getDueDate(),
                priority: todo.getPriority(),
                done: todo.isDone(),
            })
        }
    }
    localStorage.setItem('save', JSON.stringify(save))
}

export function load(){
    const save = localStorage.getItem('save');
    if(!save) return;
    const pm = JSON.parse(save);
    for(const project of pm){
        const p = ProjectManager.add({
            title : project.title,
        })
        for(const todo of project.todos){
            const t = p.add({
                title: todo.title,
                description:todo.description,
                dueDate:todo.dueDate,
                priority: todo.priority,
            })
            t.setDone(todo.done);
        }
    }
}