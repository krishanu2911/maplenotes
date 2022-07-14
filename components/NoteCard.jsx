import React, { useState } from "react";
import { BiHome, BiTrash, BiArchive, BiEdit } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import { editNoteColor, allUserNotes } from "../utils/firebaseService";
function NoteCard({ noteData }) {
  const { setUserNotes } = useUserData();
  console.log(noteData);
  const { user } = useAuth();
  // console.log(user)

  const [color, setColor] = useState("white");
  return (
    <div
      className={` w-fit p-4 max-w-sm bg-${
        noteData.bgColor === "white" ? "white" : noteData?.bgColor + "-200"
      } rounded-md`}
    >
      {/* // <div className={` w-fit p-4 max-w-sm bg-${color === "white" ? "white": color+"-200"} rounded-md`}> */}
      <h1 className=" font-bold">{noteData.title}</h1>
      <div className=" p-1 border border-black rounded-md  w-fit ">
        <h2>{noteData.priority}</h2>
      </div>

      <p>{noteData.content}</p>
      <h2 className=" font-semibold">card color</h2>
      <div className=" flex gap-2">
        <div
          onClick={async () => {
            await editNoteColor(noteData, "blue", user.uid);
            const data = await allUserNotes(user.uid);
            console.log("setting color")
            setUserNotes(data?.notes);
          }}
          className=" p-1 rounded-lg border border-gray-600"
        >
          Blue
        </div>
        <div
          onClick={async () => {
            await editNoteColor(noteData, "yellow", user.uid);
            const data = await allUserNotes(user.uid);
            console.log("setting color")
            setUserNotes(data?.notes);
          }}
          className=" p-1 rounded-lg border border-gray-600"
        >
          yellow
        </div>
        <div
          onClick={async () => {
            await editNoteColor(noteData, "white", user.uid);
            const data = await allUserNotes(user.uid);
            console.log("setting color")
            setUserNotes(data?.notes);
          }}
          className=" p-1 rounded-lg border border-gray-600"
        >
          white
        </div>
      </div>
      <div className=" flex gap-2 flex-wrap mt-2 ">
        <div>
          <BiEdit />
        </div>
        <div>
          <BiArchive />
        </div>
        <div>
          <BiTrash />
        </div>
      </div>
      <div>{noteData.date}</div>
    </div>
  );
}
export { NoteCard };
