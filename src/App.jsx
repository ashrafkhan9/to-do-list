import React from "react";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="bg-stone-900 grid py-4">
        <Todo />
      </div>
    </>
  );
};

export default App;
