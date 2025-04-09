import { createSlice } from "@reduxjs/toolkit";

const statesSlice = createSlice({
    name: "commonStates",
    initialState:{
        profileModal: false,
    },
    reducers:{
        showProfileModal: (state) =>{
            state.profileModal=true;
        },
        hideProfileModal: (state) =>{
            state.profileModal=false;
        },
    }
});

export const  {showProfileModal, hideProfileModal} = statesSlice.actions;
export default statesSlice.reducer;
