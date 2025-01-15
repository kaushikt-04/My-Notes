import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import "./styles.scss";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [generatedUrl, setGeneratedUrl] = useState(""); 
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    console.log("Delete is clicked:", { pasteId });
    dispatch(removeFromPaste(pasteId));
  }
  function handleEdit(pasteId) {
    navigate(`/?pasteId=${pasteId}`);
  }
  function handleView(pasteId) {
    navigate(`/pastes/${pasteId}`);
  }
  function handleShare(pasteId){
    const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Shareable link copied");
  }
  
  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 border bg-black"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <div className="border p-2 mt-8">
      <div className=" text-white mt-4">All Pastes</div>
      <div className="flex flex-col gap-5 mt-5 text-white">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border flex justify-between" key={paste.id}>
                <div className="ml-2">
                  <div>{paste.title}</div>
                  <div>{paste.paste.length > 10 ? paste.paste.slice(0, 10) + "..." : paste.paste}</div>
                  <div>{paste.createdAt}</div>
                </div>
                <div className="flex gap-4 place-content-evenly">
                  <button
                    className="text-black bg-black h-9 flex justify-center items-center mt-2"
                    onClick={() => handleEdit(paste?._id)}
                  >
                    <svg
                      className="text-blue-500 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      // stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      // stroke-linecap="round"
                      // stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                  <button
                    className="text-black bg-black  h-9 w-25 flex justify-center items-center mt-2"
                    onClick={() => handleView(paste._id)}
                  >
                    <svg
                      className="text-blue-500 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                       <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                    </svg>
                  </button>
                  <button
                    className="text-black bg-black h-9 flex justify-center items-center mt-2"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    <svg
                      className="text-blue-500 border-solid "
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>

                  <button
                    className="text-black bg-black h-9 flex justify-center items-center mt-2" 
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.paste);
                      toast.success("Copied to clipboard");
                    }}
                  >
                   <svg 
                  className="text-blue-500 border-solid "
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 448 512"
                   width="20"
                   height="20"
                   fill="currentColor">
                   <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>
                  </button>
                  <button className="text-black bg-black h-9 flex justify-center items-center mt-2 mr-2"
                  onClick={() => handleShare(paste._id)}>
                  <svg 
                  className="text-blue-500 border-solid "
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 512 512"
                  width="20"
                  height="20"
                  fill="currentColor">
                  <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default Paste;
