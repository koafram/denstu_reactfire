// Third-party
import { useState, useEffect } from "react";

// Components
import { TodoForm, FilterStatus, TodoItem, Footer } from ".";

// Utils
import { LOCAL_STORAGE_NAME, EMPTY_TODO, VIEW_STATUSES } from "../utils/constants";

function TodoList() {


  console.log("I am getting here2222 in TODODODOODOOD");


  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem(LOCAL_STORAGE_NAME);

    if (localTodos === null){
      return [];
    }
    
    return JSON.parse(localTodos);
  });
  // const [todos, setTodos] = useState([]);
  const [filteredStatus, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editItem, setEdit] = useState(EMPTY_TODO);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
     filterHandler();
  }, [todos, filteredStatus]);

  // Adds a todo
  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  // Updates a todo
  const updateTodo = (todo, updatedTodo) => {
    if (!updatedTodo.title || /^\s*$/.test(updatedTodo.title)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todo.id ? updatedTodo : item))
    );
  };

  // Deletes a todo
  const deleteTodo = (todoId) => {
    const remainingTodos = [...todos].filter((todo) => todo.id !== todoId);

    setTodos(remainingTodos);
  };

  // Marks a todo as complete
  const completeTodo = (todoId) => {

    console.log("completed now!!!!!");

    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  // Sets up an exisiting todo for updating
  const setTodoForEdit = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);

    setEdit(todoToEdit);
  };

  // Todo form update
  const formUpdateTodo = (todo) => {
    updateTodo(editItem, todo);

    // Clears the todo meant for editing
    setEdit(EMPTY_TODO);
  };

  // Updates the view filter
  const statusHandler = (status) =>{
    setStatus(status);
  };

  // Filters todos
  const filterHandler = () =>{
    let filtered = [];

    switch (filteredStatus) {
      case VIEW_STATUSES.complete:
        filtered = todos.filter((todo) => todo.isComplete === true);
        break;
      case VIEW_STATUSES.incomplete:
        filtered = todos.filter((todo) => todo.isComplete === false);
        break;
      default:
        filtered = todos;
        break;
    }

    setFilteredTodos(filtered);
  };

  return (
    <>
      <h1>Denstu Create To-Do List</h1>
      {!editItem.id ? (
        <TodoForm processTodoItem={addTodo} />
      ) : (
        <TodoForm editItem={editItem} processTodoItem={formUpdateTodo} />
      )}
      {todos.length > 0 ? (
        <>
          <FilterStatus statusHandler={statusHandler} disabled={editItem.id !== null} />
          <TodoItem
            todos={filteredTodos}
            isEditing={editItem.id !== null}
            setTodoForEdit={setTodoForEdit}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        </>
      ) : (
        "No todos to show"
      )}
      <Footer />
    </>
  );
}

export default TodoList;
