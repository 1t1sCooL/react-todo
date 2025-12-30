import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Filters from "./Filters";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Stats from "./Stats";
import TodoForm from "./TodoForm";

function useLocalState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

function App() {
  const [todos, setTodos] = useLocalState("todos", []);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    });
  }, [todos, filter]);

  const currentTodos = useMemo(() => {
    return filteredTodos.slice(
      currentPage * todosPerPage - todosPerPage,
      currentPage * todosPerPage
    );
  }, [filteredTodos, currentPage]);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputValue("");
      setCurrentPage(1);
    }
  }, [inputValue]);

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
      if (currentTodos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    [currentTodos.length, currentPage]
  );

  const startEditing = useCallback((id, text) => {
    setEditingId(id);
    setEditValue(text);
  }, []);

  const saveEdit = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editValue } : todo
        )
      );
      setEditingId(null);
    },
    [editValue]
  );

  const cancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <div className="app">
      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={addTodo}
      />
      <Filters
        setFilter={setFilter}
        setCurrentPage={setCurrentPage}
        filter={filter}
      />
      <TodoList
        currentTodos={currentTodos}
        setEditValue={setEditValue}
        editValue={editValue}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        toggleTodo={toggleTodo}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
        editingId={editingId}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        todosPerPage={todosPerPage}
        filteredTodos={filteredTodos}
        totalPages={totalPages}
        paginate={paginate}
      />
      <Stats todos={todos} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default App;
