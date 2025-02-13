import { useState, useRef } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const inputRef = useRef();

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const handleSave = (id, newText) => {
    if (newText.trim() === "") return;
    editTodo(id, newText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center">
        <img
          src={isComplete ? tick : not_tick}
          alt=""
          className="w-7 cursor-pointer"
          onClick={() => toggle(id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="ml-4 text-slate-700 text-[17px] border border-gray-400 rounded px-2 py-1"
          />
        ) : (
          <p
            className={`text-slate-700 ml-4 text-[17px] decoration-red-400 ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={() => handleSave(id, newText)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Save
        </button>
      ) : (
        <>
          <img
            onClick={handleEdit}
            src={edit_icon}
            alt="Edit"
            className="w-5 cursor-pointer"
          />

          <img
            onClick={() => deleteTodo(id)}
            src={delete_icon}
            alt="Delete"
            className="w-5 cursor-pointer"
          />
        </>
      )}
    </div>
  );
};

export default TodoItems;
