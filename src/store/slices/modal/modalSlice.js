import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        search:false,
        createGroup:false
    },
    reducers: {
        setModalOpen: (state, action) => {
            const {target,value}=action.payload;
            state[target] = value;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setQueryText ,setModalOpen} = modalSlice.actions;

export default modalSlice.reducer;
