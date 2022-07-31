import React, { useState } from "react";
import { BiHome, BiTrash, BiArchive, BiEdit } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import {
  editNoteColor,
  allUserNotes,
  archiveNotetoggle,
  trashNotetoggle,
  deleteNote,
  restoreNote
} from "../utils/firebaseService";
import styles from "./NoteCard.module.css";
function NoteCard({ noteData }) {
  const { setUserNotes, setUserNote, setIsEditing, setOldNote } = useUserData();
  const { user } = useAuth();
  const noteCardDate = new Date(noteData.date).toLocaleString();
  return (
    <div
      className={`w-fit p-4 max-w-sm ${
        noteData.bgColor === "white"
          ? styles.whiteBg
          : noteData.bgColor === "blue"
          ? styles.blueBg
          : styles.yellowBg
      } rounded-md`}
    >
      <h1 className=" font-bold">{noteData.title}</h1>
      <div className=" p-1 border border-black rounded-md  w-fit ">
        <h2>{noteData.priority}</h2>
      </div>

      <p>{noteData.content}</p>
      {!noteData.isArchived && !noteData.isTrashed && (
        <h2 className=" font-semibold">card color</h2>
      )}
      {!noteData.isArchived && !noteData.isTrashed && (
        <div className=" flex gap-2">
          <div
            onClick={async () => {
              if (noteData.bgColor !== "blue")
                await editNoteColor(noteData, "blue", user.uid);
              const data = await allUserNotes(user.uid);
              console.log("setting color");
              setUserNotes(data?.notes);
            }}
            className="cursor-pointer p-1 rounded-lg border border-gray-600"
          >
            Blue
          </div>
          <div
            onClick={async () => {
              if (noteData.bgColor !== "yellow")
                await editNoteColor(noteData, "yellow", user.uid);
              const data = await allUserNotes(user.uid);
              console.log("setting color");
              setUserNotes(data?.notes);
            }}
            className="cursor-pointer p-1 rounded-lg border border-gray-600"
          >
            yellow
          </div>
          <div
            onClick={async () => {
              if (noteData.bgColor !== "white")
                await editNoteColor(noteData, "white", user.uid);
              const data = await allUserNotes(user.uid);
              console.log("setting color");
              setUserNotes(data?.notes);
            }}
            className="cursor-pointer p-1 rounded-lg border border-gray-600"
          >
            white
          </div>
        </div>
      )}
      <div className=" flex justify-around mt-4 flex-wrap mb-4 ">
        {!noteData.isArchived && !noteData.isTrashed && (
          <div
            onClick={() => {
              setUserNote(noteData);
              setIsEditing(true);
              setOldNote(noteData);
            }}
            className="cursor-pointer"
          >
            <BiEdit />
          </div>
        )}

        {!noteData.isTrashed && (
          <div
            onClick={async () => {
              await archiveNotetoggle(noteData, user.uid);
              const data = await allUserNotes(user.uid);
              console.log("setting color");
              setUserNotes(data?.notes);
            }}
            className="cursor-pointer"
          >
            <BiArchive />
          </div>
        )}
          {noteData.isTrashed ?<div
          onClick={async () => {
            await restoreNote(noteData, user.uid);
            const data = await allUserNotes(user.uid);
            console.log("trash while not archived");
            setUserNotes(data?.notes);
          }}
          className="cursor-pointer"
        >
          Restore
        </div> :<div
          onClick={async () => {
            await trashNotetoggle(noteData, user.uid);
            const data = await allUserNotes(user.uid);
            console.log("trash while not archived");
            setUserNotes(data?.notes);
          }}
          className="cursor-pointer"
        >
          <BiTrash />
        </div>}

        {noteData.isTrashed && (
          <div
            onClick={async () => {
              await deleteNote(noteData, user.uid);
              const data = await allUserNotes(user.uid);
              console.log("setting color");
              setUserNotes(data?.notes);
            }}
            className="cursor-pointer"
          >
            Delete
          </div>
        )}
      </div>
      <div>{new Date(noteData.date).toLocaleString()}</div>
    </div>
  );
}
export { NoteCard };
