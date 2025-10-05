import { createTodo } from "./todo";

export const ProjectManager = function (){
    const projects = [];

    function add(obj){
        const project = createProject(obj);
        projects.push(project);
        return project;
    }

    function remove(project){
        const projectId = projects.findIndex(_project => _project ===  project)
    }

    function getProjects(){
        return [...projects];
    }

    return {
        add,
        remove,
        getProjects,
    }
}()

export function createProject(obj){
    let title;
    const todos = [];

    function add(obj){
        const todo = createTodo(obj);
        todos.push(todo);
        return todo;
    }

    function remove(todo){
        const todoIndex = todos.findIndex(_todo => _todo === todo);
        todos.splice(todoIndex, 1);
    }

    function setTitle(newTitle){
        title = newTitle;
    }

    function getTitle(){
        return title;
    }

    function getTodos(){
        return [...todos];
    }

    function length(){
        return todos.length;
    }

    function init(project){
        project.setTitle(obj.title)
    }

    const project = {
        add,
        remove,
        setTitle,
        getTitle,
        getTodos,
        length,
    };

    init(project)

    return project
}