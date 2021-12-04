import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        recentChats: [],
    },
    reducers: {
        setDashboard: (state, action) => {
            state = { ...state, ...action.payload };
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
