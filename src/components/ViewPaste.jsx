// import {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import {useSelector} from 'react-redux'
// import { addToPaste,updateToPaste } from "../redux/pasteSlice";
const ViewPaste = () => {
  const {id} = useParams();
  const allPasts = useSelector((state)=>state.paste.pastes)
  const paste = allPasts.filter((e)=>e._id===id)[0];
  console.log(paste);
  return (
    <div >
    <div className="flex flex-col gap-7 place-content-between ">
      
      <input className="p-3 rounded-2xl mt-2 border-2 w-[66%] pl-3 w-full text-white "
      type="text" 
      placeholder='Enter title here'
      value = {paste.title}
      disabled
      // onChange={(e) => setTitle(e.target.value)}
      />
      
    </div>
    <div className="mt-4 text-white">
      <textarea className="rounded-2xl mt-4 min-w-[500px] p-4 border-black"
      value={paste.paste}
      placeholder="Enter the content here"
      // onChange={(e) => setValue(e.target.value)}
      rows={20}
      disabled>
    </textarea>
    </div>
  </div>
  )
}

export default ViewPaste