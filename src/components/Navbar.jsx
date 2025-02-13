import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-slate-800 text-white items-center py-4 justify-between px-14 text-xl cursor-pointer">
      <div>iTask</div>
      <ul className="flex gap-8">
        <li>Home</li>
        <li>Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
