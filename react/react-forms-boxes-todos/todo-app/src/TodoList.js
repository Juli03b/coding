import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState("");
    const [todoToEdit, setTodoToEdit] = useState();
    const addTodo = (todo) => {
        setTodos( todos => [...todos, todo]);
    }
    const removeTodo = (idx) => {
        setTodos( todos => todos.filter( (todo, j) => j !== idx));
    }
    const handleEditEnable = (idx) => {
        setEditMode( (editMode) => !editMode);
        setTodoToEdit(idx);
    }
    const handleEditChange = (evt) => {
        const { value } = evt.target;
        setEditData( data => value);
    }
    const handleEditSubmit = (evt) => {
        evt.preventDefault();
        setTodos( todos => 
            todos.map( (todo, idx) => {
                if(idx === todoToEdit){
                    return editData;
                }
                return todo;
            })
        )
    }

    return (
        <>
            <NewTodoForm addTodo={addTodo} />
            <ul>
                {todos.map( (todo, idx) => <Todo todo={todo} removeTodo={() => removeTodo(idx)} editTodo={() => handleEditEnable(idx) } />)}
            </ul>
            { editMode && 
                <form onSubmit={handleEditSubmit} data-testid="todo-edit-form" >
                    <input value={editData} placeholder="Edit todo" onChange={handleEditChange} data-testid="todo-edit-input" />
                    <button>Update Todo</button>
                </form>
            }
        </>
    );
}

export default TodoList;