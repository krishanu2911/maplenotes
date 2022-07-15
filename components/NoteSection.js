import React from 'react'
import {NoteList} from "./NoteList";
import {NoteForm} from "./NoteForm";
function NoteSection() {
    return (
        <div className=' w-full flex items-center flex-col'>
            <NoteForm />
            <NoteList />
        </div>
    )
}
export {NoteSection}