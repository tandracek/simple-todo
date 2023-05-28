import React, { useEffect } from "react";
import {useState} from "react";
import { Todo } from "../types";
import client from "../client";

type Optional<T> = T | null

export default function TodoSection() {
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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h4>TODOS: {todos.length}</h4>
      <TodoCreate onCreate={handleCreate} />
      <Todos todos={todos}
             onUpdateTodo={handleUpdate} />
    </>
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
             onChange={handleTextChange}
             style={{marginRight: "1rem"}} />
      <button type="button"
              onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

interface TodosProps {
  todos: Todo[]
  onUpdateTodo: (todo: Todo) => void
}

function Todos(props: TodosProps) {
  const {todos, onUpdateTodo} = props;

  const todoEntries = todos.map(todo => (<TodoEntry key={todo.id}
                                                    todo={todo}
                                                    onUpdateTodo={onUpdateTodo} />));
  return (
    <div>
      {todoEntries}
    </div>
  );
}

interface TodoEntryProps {
  todo: Todo
  onUpdateTodo: (todo: Todo) => void
}

function TodoEntry(props: TodoEntryProps) {
  const {todo, onUpdateTodo} = props;

  const {completed, text} = todo;

  const [editMode, setEditMode] = useState<boolean>(false);
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

  const textView = editMode ? editBox : (<p>{text}</p>);

  return (
    <div>
      <input type="checkbox"
             checked={completed}
             onChange={handleCompletedChange}
             style={{display: "inline-block"}} />
      <div onClick={handleTextClick}
           style={{display: "inline-block", marginLeft: "1rem"}}>
        {textView}
      </div>
    </div>
  );
}