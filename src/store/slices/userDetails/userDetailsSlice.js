import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        isAuthenticated: false,
        tokenExpired: false,
    },
    reducers: {
        setUserDetails: (state, action) => {
            state = { ...state, ...action.payload };
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
