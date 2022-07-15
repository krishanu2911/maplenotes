import React from 'react'
import { NoteCard } from '../components/NoteCard';
import { useUserData } from "../context/UserDataContext";
const archive = () => {
    const { userNotes } = useUserData();
    return (
        <div className='p-4'>
            {
                userNotes.map((note) => {
                    console.log(note.isArchived)
                    return note.isArchived && !note.isTrashed && <NoteCard noteData={note} />
                })
            }
        </div>
    )
}
export default archive;