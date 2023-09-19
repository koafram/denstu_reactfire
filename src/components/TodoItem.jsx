// Third-party
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { Square, CheckSquare, Trash2, Edit2 } from "react-feather";

// Utils
import { EMPTY_TODO } from "../utils/constants";

// Styling
import "./css/todoitem.css";

function TodoItem({ todos, isEditing, setTodoForEdit, completeTodo, deleteTodo }) {
  return todos.map((todo, index) => (
    <div
      className={classNames("todo-row", {
        edit: isEditing,
        complete: todo.isComplete,
      })}
      key={index}
      onDoubleClick={() => (!isEditing && completeTodo(todo.id))}
    >
      <span>
        <div className="todo-icons">
          {(todo.isComplete) ? (
            <CheckSquare
              size="18"
              onClick={() => (!isEditing && completeTodo(todo.id))}
              className="complete-icon"
            />
            ) : (
              <Square
                size="18"
                onClick={() => (!isEditing && completeTodo(todo.id))}
                className="complete-icon"
              />
            )
          }
        </div>
        <div key={todo.id} className="todo-text">
          <div className="todo-title">{todo.title}</div>
          <div className="todo-description">{todo.description}</div>
          <div className="todo-datetime">
            {moment(todo.dateTime).format("ddd MMMM Do YYYY [at] h:mm A")}
          </div>
        </div>
      </span>
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
