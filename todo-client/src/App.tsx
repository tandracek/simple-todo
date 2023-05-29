import React from "react";
import './App.css';
import TodoSection from "./components/TodoSection";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="todo-main">
      <ErrorBoundary>
        <TodoSection />
      </ErrorBoundary>
    </div>
  );
}

export default App;
