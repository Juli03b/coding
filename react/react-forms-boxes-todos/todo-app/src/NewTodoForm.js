import { useState } from "react";
import "./NewTodoForm.css"

const NewTodoForm = ({addTodo, editTodo}) => {
    const [formData, setFormData] = useState("");
    const handleChange = (evt) => {
        const { value } = evt.target;
        setFormData( formData => value);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        addTodo(formData);
    }

    return (
        <form onSubmit={handleSubmit} data-testid="new-todo-form">
            <label htmlFor="todo">Todo:</label>
                <input id="todo" value={formData} name="todo" placeholder="Todo" onChange={handleChange} onClick={editTodo} data-testid="new-todo-input" />
            <button>Submit todo!</button>
        </form>
    )
}

export default NewTodoForm;