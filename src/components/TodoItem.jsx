// Third-party
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { CheckSquare, Trash2, Edit2 } from "react-feather";

// Utils
import { EMPTY_TODO } from "../utils/constants";

// Styling
import "./css/todoitem.css";

// interface Props {
//   todos: object;
//   isEditing: boolean;
//   setTodoForEdit: (id: number) => void;
//   completeTodo: (id: number) => void;
//   deleteTodo: (id: number) => void;
// }

// function TodoItem({ todos, isEditing, setTodoForEdit, completeTodo, deleteTodo }: Props) {

function TodoItem({ todos, isEditing, setTodoForEdit, completeTodo, deleteTodo }) {

  console.log(completeTodo);

  return todos.map((todo, index) => (
    <div
      className={classNames("todo-row", {
        edit: isEditing,
        complete: todo.isComplete,
      })}
      key={index}
      onDoubleClick={() => (!isEditing && completeTodo(todo.id))}
    >
      <div className="todo-icons">
        <CheckSquare
          size="18"
          onClick={() => console.log(todo.id)}
          className="complete-icon"
        />
      </div>
      <div key={todo.id} className="todo-text">
        <div className="todo-title">{todo.title}</div>
        <div className="todo-description">{todo.description}</div>
        <div className="todo-datetime">
          {moment(todo.dateTime).format("ddd MMMM Do YYYY [at] h:mm A")}
        </div>
      </div>
      <div className="todo-icons">
        {!isEditing && (
          <>
            <Edit2
              size="18"
              onClick={() => setTodoForEdit(todo.id)}
              className="edit-icon"
            />
            <Trash2
              size="18"
              onClick={() => deleteTodo(todo.id)}
              className="delete-icon"
            />
          </>
        )}
      </div>
    </div>
  ));
}

// Default props
TodoItem.defaultProps = {
  todos: [EMPTY_TODO],
  isEditing: false,
};

// PropTypes
TodoItem.propTypes = {
  todos: PropTypes.array,
  isEditing: PropTypes.bool,
  setTodoForEdit: PropTypes.func,
  completeTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

export default TodoItem;
