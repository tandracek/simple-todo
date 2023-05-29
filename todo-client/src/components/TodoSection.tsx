import React, {useEffect} from "react";
import {useState} from "react";
import {Todo} from "../types";
import Client from "../client";
import TodoList from "./TodoList";

interface TodoSectionProps {
  client: Client
}

type ActiveFilter = "all" | "active" | "completed"

export default function TodoSection(props: TodoSectionProps) {
  const {client} = props;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  // TODO implement loading indicator
  const fetchTodos = () => {
    client.getAllTodos()
        .then(todos => setTodos(todos))
        .catch(error => alert(error));
  }

  const handleUpdate = (todo: Todo) => {
    client.updateTodo(todo.id, todo)
        .then(todo => {
          const updatedTodos = todos.map(t => (t.id === todo.id ? todo : t));
          setTodos(updatedTodos);
        })
        .catch(error => alert(error));
  }

  const handleCreate = (text: string) => {
    client.createTodo({text, completed: false})
      .then(todo => {
        setTodos([...todos, todo]);
      })
      .catch(error => alert(error));
  }

  const handleDelete = (id: number) => {
    client.deleteTodo(id)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => alert(error));
  }

  const handleFilterChange = (filter: ActiveFilter) => {
    setActiveFilter(filter);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === "all") {
      return todo;
    }
    return activeFilter === "completed" ? todo.completed : !todo.completed;
  });

  return (
    <div style={{width: "50%"}}>
      <h4 title="counter" style={{textAlign: "center"}}>Active TODOS: {activeTodos.length}</h4>
      <TodoFilters activeFilter={activeFilter}
                   onFilterChange={handleFilterChange} />
      <TodoCreate onCreate={handleCreate} />
      <TodoList todos={filteredTodos}
                onUpdateTodo={handleUpdate}
                onDelete={handleDelete} />
    </div>
  )
}

interface TodoFiltersProps {
  activeFilter: ActiveFilter
  onFilterChange: (filter: ActiveFilter) => void 
}

function TodoFilters(props: TodoFiltersProps) {
  const {activeFilter, onFilterChange} = props;

  return (
    <div style={{textAlign: "center"}}>
      <input type="radio"
              value="all"
              name="all"
              checked={activeFilter === "all"}
              onChange={() => onFilterChange("all")} /> All
      <input type="radio"
              value="active"
              name="active"
              checked={activeFilter === "active"}
              onChange={() => onFilterChange("active")} /> Active
      <input type="radio"
              value="completed"
              name="comleted"
              checked={activeFilter === "completed"}
              onChange={() => onFilterChange("completed")} /> Completed
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
    <div style={{textAlign: "center"}}>
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