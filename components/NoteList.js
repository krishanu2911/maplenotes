import React from 'react'
import { useUserData } from "../context/UserDataContext"
function NoteList() {
    const { userNotes } = useUserData();
    console.log(userNotes)
    return (
        <div>
            NoteList
        </div>
    )
}
export {NoteList}