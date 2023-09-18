// Third-party
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";

// Utils
import { EMPTY_TODO } from "../utils/constants";

// Styling
import "react-datepicker/dist/react-datepicker.css";
import "./css/todoform.css";

const emptyValues = {
  title: "",
  description: "",
  dateTime: new Date(),
};

function TodoForm({ processTodoItem, editItem }) {


  // const initialValues = {
  //   title: editItem && editItem.id ? editItem.title : emptyValues.title,
  //   title1: editItem?.id ? editItem.title : emptyValues.title,
  //   description: editItem && editItem.id ? editItem.description : emptyValues.description,
  //   dateTime: editItem && editItem.id ? editItem.dateTime : emptyValues.dateTime,
  // };

  const [inputs, setInputs] = useState(editItem);

  const inputRef = useRef(null);

  useEffect(() => {
    setInputs(editItem);
  }, [editItem]);

  // Updates the inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Updates the time
  const handleDateChange = (newDateTime) => {
    setInputs({
      ...inputs,
      dateTime: newDateTime,
    });
  };

  // Submits form
  const handleSubmit = (e) => {
    e.preventDefault();

    processTodoItem({
      id:
        editItem && editItem.id
          ? editItem.id
          : Math.floor(Math.random() * 10000).toString(),
      title: inputs.title,
      description: inputs.description,
      dateTime: inputs.dateTime.toString(),
      isComplete: editItem && editItem.id ? editItem.isComplete : false,
    });

    inputRef.current.focus();

    setInputs(emptyValues);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <>
        <input
          name="title"
          className={classNames("todo-input", { edit: editItem.id })}
          value={inputs.title}
          placeholder={editItem.id ? "Update your title" : "Add a todo title"}
          onChange={(e) => handleInputChange(e)}
          maxLength="40"
          ref={inputRef}
        />
        <textarea
          name="description"
          className={classNames("todo-input", { edit: editItem.id })}
          value={inputs.description}
          placeholder={
            editItem.id ? "Update your description" : "Add a todo description"
          }
          onChange={(e) => handleInputChange(e)}
          maxLength="160"
        />
        <DatePicker
          name="dateTime"
          className={classNames("todo-input date-picker", {
            edit: editItem.id,
          })}
          selected={(inputs?.dateTime) ? new Date(inputs.dateTime) : new Date()}
          // selected={new Date(inputs.dateTime)}
          onChange={(date) => handleDateChange(date)}
          showTimeSelect
          minDate={
            moment(inputs.dateTime).isBefore(emptyValues.dateTime)
              ? inputs.dateTime
              : emptyValues.dateTime
          }
          dateFormat="E MMMM d, yyyy h:mm aa"
        />
        <button
          onClick={handleSubmit}
          className={classNames("todo-button", { edit: editItem.id })}
        >
          {editItem.id ? "Update" : "Add todo"}
        </button>
      </>
    </form>
  );
}

// Default props
TodoForm.defaultProps = {
  editItem: EMPTY_TODO,
};

// PropTypes
TodoForm.propTypes = {
  processTodoItem: PropTypes.func.isRequired,
  editItem: PropTypes.object,
};

export default TodoForm;
