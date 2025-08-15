const API_URL = 'http://localhost:3001/todos';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // fetch todos
  fetchTodos();
});

// Fetch todos from backend
async function fetchTodos() {
     const todoList = document.querySelector('#todo-list');
    //  write here    
    try{
        todoList.innerHTML = '';
        const response = await axios.get("http://localhost:3001/todos/");
        const todos = response.data;
        todos.forEach(todo =>addTodoToDOM(todo))
    }catch(error){
        console.error('Error fetching todos:', error)
    }
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    //  write here
    const todoList = document.querySelector('#todo-list');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.setAttribute('data-id', todo.id);

   

    const title = document.createElement('span');
    title.textContent = todo.task

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener('click',()=>deleteTodo(todo.id))

    

    todoItem.appendChild(title);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);
    
}

// Toggle todo completion
function toggleTodo(id, completed) {
//    write here
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', async () => {
    const task = document.querySelector('#todo-input').value;
    if (!task) return console.error('Input not found');

    try {
        const response = await axios.post("http://localhost:3001/todos/", { task });
        addTodoToDOM(response.data); // pass full todo object
        document.querySelector('#todo-input').value = '';
    } catch (err) {
        console.error('Error adding todo:', err);
    }
});


// Toggle todo completion
// async function toggleTodo(id, completed) {
//     try {
//         const todoItem = document.querySelector(`[data-id='${id}']`);
//         if (todoItem) {
//             todoItem.classList.toggle('completed', response.data.completed);
//         }
//     } catch (error) {
//         console.error('Error toggling todo:', error);
//     }
// }


// Delete a todo

async function deleteTodo(id) {
    // write here  
    try{
        await axios.delete(`http://localhost:3001/todos/${id}`)
        const todoItem = document.querySelector(`[data-id='${id}']`);
        todoItem.remove();
    }catch(error){
        console.error('Error deleting todo:', error)
    }
}