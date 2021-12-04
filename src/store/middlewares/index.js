import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        console.log(thunkAPI.signal);
        throw Error("To test rejectWithValue")
        // try {
        //     // setTimeout(()=>{
        //     //     const data = { id: userId, name: "Samarpan" };
        //     //     return data;
        //     // },2000);
        //     // return await new Promise(resolve => setTimeout(() => { resolve({ id: userId, name: "Samarpan" }) }, 2000))
        //     // const response = await fetch(`http://localhost:2000/api/user/${userId}`)
        //     // const data = response.json();
        // } catch (error) {
        //     return thunkAPI.rejectWithValue("Error while fetching user by id")
        // }
    }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: 'users',
    initialState: { loading: 'idle' },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserById.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("fetchUserById.pending")
            // console.log(action.payload)
        })
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            console.log("fetchUserById.fulfilled")
            console.log(action.payload)
            state = { ...state, ...action.payload };
            return state;
        })
        builder.addCase(fetchUserById.rejected, (state, action) => {
            console.log("fetchUserById.rejected")
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload)
            // Error in payloadCreator callback
            console.log(action.error)
        })
    },
})
export default usersSlice.reducer;
export { fetchUserById };
// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))