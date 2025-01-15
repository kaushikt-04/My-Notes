import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState ={
    pastes:localStorage.getItem("pastes")
    ?   JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    
    addToPaste: (state,action) => {
      const paste = action.payload;
      // Check if a paste with the same content already exists
      const pasteExists = state.pastes.some(existingPaste => existingPaste._id === paste._id);
      // console.log(state.pastes)
      if (pasteExists) {
        toast("Paste already exists");
        return; // Exit the reducer if the paste is already in the array
      }

      state.pastes.push(paste);
      //localstorage.setItem('key',value)
      
      localStorage.setItem('pastes',JSON.stringify(state.pastes));
      toast.success("Paste created successfully")
    },
    updateToPaste: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id==paste._id);
      if(index>=0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste updated successfully")
      }
    },
    ResetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state,action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item)=>item._id===pasteId);
      
      if(index>=0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("Paste deleted");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, ResetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer