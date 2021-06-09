import "./Todo.css"

const Todo = ({todo, removeTodo, editTodo}) => (
    <li>
        <p onClick={editTodo} data-testid="todo">{todo}</p>
        <button onClick={removeTodo}>X</button>
    </li>
);

export default Todo;