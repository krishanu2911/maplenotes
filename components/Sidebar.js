import React from "react";
import { BiHome, BiTrash, BiArchive } from "react-icons/bi";
function Sidebar() {
  return (
    <div className="p-4 w-fit">
      <ul className="flex flex-row text-3xl gap-5 md:flex-col">
        <li className="flex items-center gap-5 cursor-pointer">
          <BiHome />
          Home
        </li>
        <li className="flex items-center gap-5 cursor-pointer">
          <BiTrash />
          Trash
        </li>
        <li className="flex items-center gap-5 cursor-pointer">
          <BiArchive />
          Archive
        </li>
      </ul>
    </div>
  );
}
export { Sidebar };
