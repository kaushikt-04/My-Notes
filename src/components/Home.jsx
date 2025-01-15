import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { addToPaste,updateToPaste } from "../redux/pasteSlice";
const Home = () => {
  const [title,setTitle] = useState('');
  const [value,setValue] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes)
 
  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=>p._id===pasteId)
      console.log(paste.title)
      setTitle(paste.title);
      setValue(paste.paste);
    }
  },[pasteId,allPastes])

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  function createMyPaste(){
    const paste = {
      title: title,
      paste: value,
      _id: pasteId || Date.now().toString(36),
      createdAt:formatDate(new Date()),
    }
    
    if(pasteId){
      //pastID is preset i.e update the paste
      dispatch(updateToPaste(paste));
    }
    else{
       //pastID is not preset i.e creat the paste
      dispatch(addToPaste(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
    <div >
      <div className="flex flex-row gap-7 place-content-between justify-center  ">
        <input className="p-3 rounded-2xl mt-2 w-[66%] pl-3 border bg-black text-white"
        type="text" 
        placeholder='Enter title here'
        value = {title}
        onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={createMyPaste}
          className="p-3 rounded-2xl mt-2 bg-[#6674CC] text-white">
          {
            pasteId ? "Update Paste" : "Create My Paste"
          }
        </button>
      </div>
      <div className="mt-4">
        <textarea className="rounded-2xl mt-4 min-w-[500px] p-4 border-white border bg-black text-white"
        value={value}
        placeholder="Enter the content here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}>
      </textarea>
      </div>
    </div>
  )
}

export default Home