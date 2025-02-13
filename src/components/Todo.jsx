import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prevTodo) => [...prevTodo, newTodo]);
    inputRef.current.value = "";
    toast.success("Todo Added successfully!"); // Show toast notification
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully!"); // Show toast notification
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    });
  };

  const editTodo = (id, updatedText) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
    toast.success("Todo updated successfully!");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-2xl flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* TITLE */}
      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} alt="" className="w-8" />
        <h1 className="text-3xl font-semibold">To-do List</h1>
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-400 hover:bg-orange-500 transition-all duration-300 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD+
        </button>
      </div>

      {/* TODO LIST */}
      <div>
        {todoList.map((item, index) => (
          <TodoItems
            text={item.text}
            key={index}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Todo;
