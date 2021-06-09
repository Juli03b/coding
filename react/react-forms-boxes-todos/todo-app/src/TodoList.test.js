import { fireEvent, render } from "@testing-library/react";
import TodoList from "./TodoList";

it("Should render", () => {
    render(<TodoList />);    
});

it("Should match snapshots", () => {
    const { asFragment } = render(<TodoList />);    

    expect(asFragment()).toMatchSnapshot();
});

describe('Test typing a task, submitting, and editing', () => {
    const { getByTestId, getAllByTestId } = render(<TodoList />);    
    const newTodoForm = getByTestId("new-todo-form");
    const newTodoInput = getByTestId("new-todo-input");
    
    fireEvent.change(newTodoInput, {target: {value: "Go outside"}});
    fireEvent.submit(newTodoForm);

    const todo = getByTestId("todo");
    expect(todo).toBeInTheDocument();

    fireEvent.click(todo);
    
    const editForm = getByTestId("todo-edit-form");
    const editInput = getByTestId("todo-edit-input");
    expect(editForm).toBeInTheDocument();
    expect(editInput).toBeInTheDocument();

    fireEvent.change(editInput, {target: {value: "EAT"}});
    fireEvent.submit(editForm);


    const todoUpdated = getByTestId("todo");
    expect(todoUpdated).toBeInTheDocument();
});
