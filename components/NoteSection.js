import React from 'react'
import {NoteList} from "./NoteList";
import {NoteForm} from "./NoteForm";
function NoteSection() {
    return (
        <div className=' w-full flex justify-center items-center flex-col'>
            <NoteForm />
            <NoteList />
        </div>
    )
}
export {NoteSection}