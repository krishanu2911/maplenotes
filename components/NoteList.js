import React from "react";
import { useUserData } from "../context/UserDataContext";
import { NoteCard } from "./NoteCard";
function NoteList() {
  const { userNotes } = useUserData();
  console.log(userNotes);
  return (
    <div className=" flex gap-4 flex-wrap justify-center">
      {userNotes.map((details) => {
        return <NoteCard noteData={details} />;
      })}
    </div>
  );
}
export { NoteList };
