import React from 'react'
import { NoteCard } from '../components/NoteCard';
import { useUserData } from "../context/UserDataContext";
const trash = () => {
    const { filteredNotes } = useUserData();
    return (
        <div className='p-4'>
            {
                filteredNotes.map((note) => {
                    return note.isTrashed && <NoteCard noteData={note} />
                })
            }
        </div>
    )
}
export default trash