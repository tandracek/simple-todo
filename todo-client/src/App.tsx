import React from "react";
import './App.css';
import TodoSection from "./components/TodoSection";
import ErrorBoundary from "./components/ErrorBoundary";
import Client from "./client";

const client = new Client("http://localhost:8080");

function App() {
  return (
    <div className="todo-main">
      <ErrorBoundary>
        <TodoSection client={client} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
