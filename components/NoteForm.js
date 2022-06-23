import React from "react";
function NoteForm() {
    const setValue = (e) => {
        console.log(e.value)
    }
  return (
    <div  className=" w-96 bg-slate-500 p-3 rounded-lg">
      <form className=" w-full flex flex-col gap-3">
        <input type="text" name="title" placeholder="Title" className=" bg-slate-500 border-5 border-gray-500" />
        <input type="text" name="note" placeholder="start noting" className="bg-slate-500 min-h-24 outline-hidden border-hidden" />
      </form>
    </div>
  );
}
// const ReactQuill = dynamic(
// 	() => {
// 		return import('react-quill');
// 	},
// 	{ ssr: false }
// );
export { NoteForm };
