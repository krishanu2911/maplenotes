import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {addNote , allUserNotes , editNote} from "../utils/firebaseService";
import { useUserData } from "../context/UserDataContext";
function NoteForm() {
  const initialNoteData = {
    bgColor: "white",
    content: "",
    date: Date.now(),
    isArchived: false,
    isPinned: false,
    isTrashed: false,
    label: "Work",
    priority: "High",
    title: "",
  }
  // const [userNote, setUserNote] = useState(initialNoteData);
  const { user } = useAuth();
  const { setUserNotes , userNote, setUserNote , isEditing , setIsEditing , oldNote } = useUserData();
  const handleChange = (e) => {
    console.log("hello")
    const name = e.target.name;
    const value = e.target.value;
    setUserNote({ ...userNote, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setUserNote(initialNoteData)
    setIsEditing(false)
    if(isEditing && oldNote !== userNote) {
      console.log("editing..........")
      await editNote(oldNote , userNote, user.uid)
      allUserNotes(user.uid).then(data => setUserNotes(data.notes) )
    }else  {
      await addNote(userNote, user.uid)
      allUserNotes(user.uid).then(data => setUserNotes(data.notes) )
    }
  }
  return (
    <div className=" w-96 bg-slate-700 p-4 rounded-lg mt-2 mb-8">
      <form className=" w-full flex flex-col gap-3" onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={userNote.title}
          className=" rounded p-4 bg-slate-500 border-5"
          onChange={(e) => handleChange(e)}
          required
        />
        <textarea
          type="text"
          name="content"
          placeholder="start noting"
          className=" rounded p-4 bg-slate-500 min-h-24 outline-hidden border-hidden"
          value={userNote.content}
          onChange={(e) => handleChange(e)}
          required
        />
        <label className="font-bold text-white">Priority</label>
        <select
          name="priority"
          id="priority"
          className="input-text"
          value={userNote.priority}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label className="font-bold text-white">label</label>
        <select
          name="label"
          id="label"
          className="input-text"
          value={userNote.label}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Chores">Chores</option>
          <option value="Exercise">Exercise</option>
        </select>
        <button className=" p-4 bg-gray-900 rounded-md text-white font-bold">{isEditing ? "Edit" : "Add Note"}</button>
      </form>
    </div>
  );
}
export { NoteForm };
