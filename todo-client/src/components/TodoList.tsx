import {useState} from "react";
import {Todo} from "../types";

type Optional<T> = T | null

interface TodosProps {
  todos: Todo[]
  onUpdateTodo: (todo: Todo) => void
  onDelete: (id: number) => void
}
  
export default function TodoList(props: TodosProps) {
  const {todos, onUpdateTodo, onDelete} = props;

  const todoEntries = todos.map(todo => (<TodoEntry key={todo.id}
                                                    todo={todo}
                                                    onUpdateTodo={onUpdateTodo}
                                                    onDelete={onDelete} />));
  return (
    <div style={{marginTop: "1rem"}}>
      {todoEntries}
    </div>
  );
}

interface TodoEntryProps {
  todo: Todo
  onUpdateTodo: (todo: Todo) => void
  onDelete: (id: number) => void
}

function TodoEntry(props: TodoEntryProps) {
  const {todo, onUpdateTodo, onDelete} = props;

  const {completed, text, id} = todo;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [editText, setEditText] = useState<Optional<string>>(text);

  const handleCompletedChange = event => {
    const {target: {checked}} = event;
    onUpdateTodo({...todo, completed: checked});
  }

  const handleTextChange = event => {
    const {target: {value}} = event;
    setEditText(value);
  }

  const handleTextClick = event => {
    const {detail} = event;
    if (detail === 2) {
      setEditMode(true);
    }
  }

  const detectEnter = event => {
    const {keyCode} = event;
    if (keyCode === 13) {
      event.preventDefault();
      onUpdateTodo({...todo, text: editText});
      setEditMode(false);
    }
  }

  const editBox = (
    <input type="text"
            onKeyDown={detectEnter}
            value={editText}
            onChange={handleTextChange} />
  );

  const deleteButton = (
    <button type="button"
            onClick={() => onDelete(id)}
            style={{marginLeft: "1rem"}}>
      Delete
    </button>
  );

  const textView = editMode ? editBox : text;

  return (
    <div style={{border: "1px solid black", padding: ".5rem"}}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}>
      <input type="checkbox"
              id={`completed-${id}`}
              checked={completed}
              onChange={handleCompletedChange}
              style={{display: "inline-block"}} />
      <div onClick={handleTextClick}
            style={{display: "inline-block", marginLeft: "1rem"}}>
        {textView}
      </div>
      <div style={{display: "inline-block", float: "right", verticalAlign: "middle"}}>
        {showDelete ? deleteButton : null}
      </div>
    </div>
  );
}