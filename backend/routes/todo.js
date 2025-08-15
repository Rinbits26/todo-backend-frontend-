let todos = []; // in memory space
let currentId = 1;

export async function getAllTodo (req, res, next){
    //  write here
    res.send(todos)
}

export async function createTodo (req, res, next){
    //  write here
    const task = req.body.task;

    if(!task){
        return res.status(400).send({error : "Task is required"})
    }

    const newtodo = {
        id : currentId++,
        task: task,
        complete: false
    };

    todos.push(newtodo);
    res.status(201).send(newtodo)
}

export async function updateTodo (req, res, next){
    const id = parseInt(req.params.id, 10);
    const task = req.body.task;

    if (!task) {
        return res.status(400).send({ error: "Task is required" });
    }

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(400).send({ error: `No Todo with id:${id} found, please provide correct id` });
    }

    todo.task = task; 
    res.send(todo);
}

export async function deleteTodoById (req, res, next){
    //  write here
    const id = parseInt(req.params.id, 10);
    
    const todoIndex = todos.findIndex(todo => todo.id == id);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1); 
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
}

export async function searchTodo(req, res, next) {
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({ message: 'Query parameter missing' });
    }

    const filteredTodos = todos.filter(t => t.task.toLowerCase().includes(q.toLowerCase()))

    if(filteredTodos.length === 0){
        return res.status(400).send({error: "No todo found!"})
    }

    res.status(200).send(filteredTodos);

}   