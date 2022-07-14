import React from "react";
import Link from 'next/link'
import { BiHome, BiTrash, BiArchive } from "react-icons/bi";
function Sidebar() {
  return (
    <div className="p-4 w-fit">
      <ul className="flex flex-row text-3xl gap-5 flex-wrap md:flex-col ">
        <Link href="/">
        <li className="flex items-center gap-5 cursor-pointer">
          <BiHome />
          Home
        </li>
        </Link>
        <Link href="/trash">
        <li className="flex items-center gap-5 cursor-pointer">
          <BiTrash />
          Trash
        </li>
        </Link>
        <Link href="/archive">
        <li className="flex items-center gap-5 cursor-pointer">
          <BiArchive />
          Archive
        </li>
        </Link>
      </ul>
    </div>
  );
}
export { Sidebar };
