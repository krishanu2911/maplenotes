import React from "react";
import { useUserData } from "../context/UserDataContext";
import { NoteCard } from "./NoteCard";
function NoteList() {
  const { userNotes , filteredNotes } = useUserData();
  // console.log(userNotes);
  return (
    <div className=" mb-8 flex gap-4 flex-wrap justify-center">
      {filteredNotes.length !== 0 ? filteredNotes?.map((details) => {
        return !details.isArchived && !details.isTrashed && <NoteCard noteData={details} />;
      }) : <h1>Empty Notes</h1>}
    </div>
  );
}
export { NoteList };
