import React, { useEffect } from "react";
import {useState} from "react";
import { Todo } from "../types";
import Client from "../client";

type Optional<T> = T | null

interface TodoSectionProps {
  client: Client
}

// TODO Pass in the client instead
export default function TodoSection(props: TodoSectionProps) {
  const {client} = props;

  const [todos, setTodos] = useState<Todo[]>([]);

  // TODO implement loading indicator
  const fetchTodos = () => {
    client.getAllTodos()
        .then(todos => setTodos(todos));
  }

  const handleUpdate = (todo: Todo) => {
    client.updateTodo(todo.id, todo)
        .then(todo => {
          const updatedTodos = todos.map(t => (t.id === todo.id ? todo : t));
          setTodos(updatedTodos);
        })
  }

  const handleCreate = (text: string) => {
    client.createTodo({text, completed: false})
      .then(todo => {
        setTodos([...todos, todo]);
      });
  }

  const handleDelete = (id: number) => {
    client.deleteTodo(id)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h4 title="counter">TODOS: {todos.length}</h4>
      <TodoCreate onCreate={handleCreate} />
      <Todos todos={todos}
             onUpdateTodo={handleUpdate}
             onDelete={handleDelete} />
    </div>
  )
}

interface TodoCreateProps {
  onCreate: (text: string) => void
}

function TodoCreate(props: TodoCreateProps) {
  const {onCreate} = props;

  const [text, setText] = useState<string>("");

  const handleTextChange = event => {
    const {target: {value}} = event;
    setText(value);
  }

  const handleCreate = () => {
    onCreate(text);
  }

  return (
    <div>
      <input type="text"
             value={text}
             id="create-input"
             onChange={handleTextChange}
             style={{marginRight: "1rem"}} />
      <button type="button"
              id="create-button"
              onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

interface TodosProps {
  todos: Todo[]
  onUpdateTodo: (todo: Todo) => void
  onDelete: (id: number) => void
}

function Todos(props: TodosProps) {
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
             checked={completed}
             onChange={handleCompletedChange}
             style={{display: "inline-block"}} />
      <div onClick={handleTextClick}
           style={{display: "inline-block", marginLeft: "1rem"}}>
        {textView}
      </div>
      <div style={{display: "inline-block"}}>
        {showDelete ? deleteButton : null}
      </div>
    </div>
  );
}