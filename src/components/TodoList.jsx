// Third-party
import { useState, useEffect, useRef } from "react";
import { useFirestore, useFirestoreCollectionData, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { doc, collection, getFirestore, setDoc, deleteDoc } from 'firebase/firestore';

// Components
import { TodoForm, FilterStatus, TodoItem, Footer } from ".";

// Utils
import { TODO_LIST_COLLECTION, LOCAL_STORAGE_NAME, EMPTY_TODO, VIEW_STATUSES } from "../utils/constants";

function TodoList() {
  const firebaseApp = useFirebaseApp();

  const firestore = useFirestore();
  const firestoreInstance = getFirestore(firebaseApp);

  const todoListDBRef = collection(firestore, TODO_LIST_COLLECTION);
  const { status, data } = useFirestoreCollectionData(todoListDBRef);

  const [todos, setTodos] = useState([]);
  const [filteredStatus, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editItem, setEdit] = useState(EMPTY_TODO);
  const scrollToTop = useRef();


  useEffect(() => {
    setTodos(data);
  }, [data]);

  useEffect(() => {
     filterHandler();
  }, [todos, filteredStatus]);


  // Adds a todo
  const addTodo = async (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [todo, ...todos];

    console.log("about to add new todo = ", todo);

    // todosRef.add(todo);
    // const t = await addDoc(todosDBRef, todo);
    // console.log("Document written with ID: ", t.id);

    await setDoc(doc(firestoreInstance, TODO_LIST_COLLECTION, todo.id), todo);
  
    setTodos(newTodos);

    scrollToTop.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Updates a todo
  const updateTodo = async (todo, updatedTodo) => {
    if (!updatedTodo.title || /^\s*$/.test(updatedTodo.title)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todo.id ? updatedTodo : item))
    );

    await setDoc(doc(firestore, TODO_LIST_COLLECTION, updatedTodo.id), updatedTodo);

    scrollToTop.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Deletes a todo
  const deleteTodo = async (todoId) => {
    const remainingTodos = [...todos].filter((todo) => todo.id !== todoId);

    await deleteDoc(doc(firestore, TODO_LIST_COLLECTION, todoId));

    setTodos(remainingTodos);
  };

  // Marks a todo as complete
  const completeTodo = async (todoId) => {

    let completedTodo;

    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isComplete = !todo.isComplete;
        completedTodo = todo;

        console.log("completedTodo = ", completedTodo);
      }
      return todo;
    });

    await setDoc(doc(firestore, TODO_LIST_COLLECTION, todoId), completedTodo);

    setTodos(updatedTodos);
  };

  // Sets up an exisiting todo for updating
  const setTodoForEdit = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);

    setEdit(todoToEdit);

    scrollToTop.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Todo form update
  const formUpdateTodo = (todo) => {
    updateTodo(editItem, todo);

    // Clears the todo meant for editing
    setEdit(EMPTY_TODO);

    scrollToTop.current.scrollIntoView({ behavior: 'smooth' });
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
    <FirestoreProvider sdk={firestoreInstance}>
      <>
        <h1 ref={scrollToTop}>Dentsu Creative To-Do List</h1>
        {!editItem?.id ? (
          <TodoForm processTodoItem={addTodo} />
        ) : (
          <TodoForm editItem={editItem} processTodoItem={formUpdateTodo} />
        )}
        {(status === 'loading') ? (
          "Fetching to-do list..."
        ) : (
          todos?.length > 0 ? (
            <>
              <FilterStatus statusHandler={statusHandler} disabled={editItem?.id !== null} />
              <TodoItem
                todos={filteredTodos}
                isEditing={editItem?.id !== null}
                setTodoForEdit={setTodoForEdit}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
              />
            </>
          ) : (
            "No to-dos to show"
          )
        )}
        <Footer />
      </>
    </FirestoreProvider>
  );
}

export default TodoList;
