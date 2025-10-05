export const PRIORITY = {
    LOW : 0,
    MEDIUM : 1,
    HIGH : 2,
}

export function createTodo(obj){

    const id = crypto.randomUUID();
    let title, description, dueDate, priority;
    let done = false;

    function setTitle(newTitle){
        title = newTitle;
    }

    function setDescription(newDescription){
        description = newDescription;
    }

    function setDueDate(newDate){
        dueDate = newDate;
    }

    function setPriority(newPriority){
        priority = newPriority;
    }

    function setDone(bool){
        done = bool;
    }

    function toggleDone(){
        done = !done;
    }

    function getTitle(){
        return title;
    }

    function getDescription(){
        return description;
    }

    function getDueDate(){
        return dueDate;
    }

    function getPriority(){
        return priority;
    }

    function isDone(){
        return done;
    }

    function getId(){
        return id;
    }

    function init(todo){
        todo.setTitle(obj.title);
        todo.setDescription(obj.description);
        todo.setDueDate(obj.dueDate);
        todo.setPriority(obj.priority);
        todo.setDone(false);
    }

    const todo = {
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setDone,
        toggleDone,
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        isDone,
        getId,
    }

    init(todo)

    return todo
}