import { createSlice } from "@reduxjs/toolkit";

export const currentChatSlice = createSlice({
    name: "currentChatSlice",
    initialState: {
        isProfileOpen: false,
        user: null,
        conversationId:null
    },
    reducers: {
        setCurrentChat: (state, action) => {
            state = { ...state, ...action.payload };
            return state;
        },
        setIsProfileOpen: (state, action) => {
            state.isProfileOpen = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat, setIsProfileOpen } = currentChatSlice.actions;

export default currentChatSlice.reducer;
