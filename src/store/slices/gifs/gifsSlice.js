import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrendingGifs = createAsyncThunk("gifs/fetchTrendingGifs", async (queryText, thunkAPI) => {
    try {
        const response = await fetch("/api/gif/trending?limit=30");
        const data = await response.json();
        return data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Error while fetching trending gifs");
    }
});

export const gifsSlice = createSlice({
    name: "gifsSlice",
    initialState: {
        trending: [],
    },
    reducers: {
        setTrendingGifs: (state, action) => {
            state.trending = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrendingGifs.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("fetchTrendingGifs.pending");
            // console.log(action.payload)
        });
        builder.addCase(fetchTrendingGifs.fulfilled, (state, action) => {
            console.log("fetchTrendingGifs.fulfilled");
            console.log(action.payload);
            state.trending = action.payload.results;
            // state = { ...state, ...action.payload };
            // return state;
        });
        builder.addCase(fetchTrendingGifs.rejected, (state, action) => {
            console.log("fetchTrendingGifs.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
            // Error in payloadCreator callback
            console.log(action.error);
        });
    },
});

// Action creators are generated for each case reducer function
export const { setTrendingGifs } = gifsSlice.actions;

export default gifsSlice.reducer;
