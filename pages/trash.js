import React from 'react'
import { NoteCard } from '../components/NoteCard';
import { useUserData } from "../context/UserDataContext";
const trash = () => {
    const { userNotes } = useUserData();
    return (
        <div className='p-4'>
            {
                userNotes.map((note) => {
                    return note.isTrashed && <NoteCard noteData={note} />
                })
            }
        </div>
    )
}
export default trash