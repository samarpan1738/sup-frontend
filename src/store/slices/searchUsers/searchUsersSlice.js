import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsersByQuery = createAsyncThunk("searchUsers/fetchUsersByQuery", async (queryText, thunkAPI) => {
    try {
        // const accessToken = thunkAPI.getState().userDetails.accessToken;
        console.log(queryText);
        const response = await fetch(`/api/user/search?query=${queryText}`);
        const data = response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Error while fetching users by query text");
    }
});
const searchUsersSlice = createSlice({
    name: "searchUsers",
    initialState: {
        loading: false,
        searchResults: [],
        queryText: "",
        isModalOpen: false,
    },
    reducers: {
        setQueryText: (state, action) => {
            console.log(state);
            state.queryText = action.payload;
            if (action.payload.length === 0) {
                state.searchResults = [];
            }
        },
        setModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersByQuery.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("fetchUsersByQuery.pending");
            // console.log(action.payload)
        });
        builder.addCase(fetchUsersByQuery.fulfilled, (state, action) => {
            console.log("fetchUsersByQuery.fulfilled");
            console.log(action.payload);
            state.searchResults = action.payload.data;
            // state = { ...state, ...action.payload };
            // return state;
        });
        builder.addCase(fetchUsersByQuery.rejected, (state, action) => {
            console.log("fetchUsersByQuery.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
            // Error in payloadCreator callback
            console.log(action.error);
        });
    },
});

// Action creators are generated for each case reducer function
export const { setQueryText ,setModalOpen} = searchUsersSlice.actions;

export default searchUsersSlice.reducer;
