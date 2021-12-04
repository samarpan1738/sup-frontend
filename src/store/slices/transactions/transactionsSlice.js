import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: [],
    reducers: {
        setTransactions: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
