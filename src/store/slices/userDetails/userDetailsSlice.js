import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../../services/UserService";

export const persistUserDetails = createAsyncThunk("userDetails/persistUserDetails", async ({ username, status }, thunkApi) => {
    try {
        const res = await UserService.updateUserStatus(username, {
            status,
        });
        const data = await res.json();
        console.log("data : ", data);
        if (data.success) {
            return data.data;
        } else {
            return thunkApi.rejectWithValue("Unable to update user details");
        }
    } catch (error) {
        return thunkApi.rejectWithValue("Error updating user details");
    }
});
export const populateUserDetails = createAsyncThunk("userDetails/populateUserDetails", async (data, thunkApi) => {
    try {
        const res = await UserService.getLoggedInUserDetails();
        const data = await res.json();
        console.log("userDetails/populateUserDetails data : ", data);
        if (data && data.success) {
            return {
                isAuthenticated: true,
                tokenExpired: false,
                loading: false,
                name: data.data.name,
                email: data.data.email,
                userId: data.data.id,
                profile_pic_uri: data.data.profile_pic_uri,
                status: data.data.status,
                username: data.data.username,
            }
        } else {
            console.log("Rejecting userDetails/populateUserDetails")
            return thunkApi.rejectWithValue({
                isAuthenticated: false,
                tokenExpired: true,
                loading: false
            });
        }
    } catch (error) {
        return thunkApi.rejectWithValue({
            isAuthenticated: false,
            tokenExpired: true,
            loading: false
        });
    }
})
export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        isAuthenticated: false,
        tokenExpired: false,
        loading: true
    },
    reducers: {
        setUserDetails: (state, action) => {
            state = { ...state, ...action.payload, loading: false };
            return state;
        },
    },
    extraReducers: (builder) => {
        //* For addConversation thunk
        builder.addCase(persistUserDetails.pending, (state, action) => {
            console.log("userDetails/persistUserDetails");
        });
        builder.addCase(persistUserDetails.fulfilled, (state, action) => {
            console.log("userDetails/persistUserDetails");
            console.log(action.payload);
            state = { ...state, ...action.payload };
            return state;
        });
        builder.addCase(persistUserDetails.rejected, (state, action) => {
            console.log("userDetails/persistUserDetails");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
        });

        //* For populateUserDetails thunk
        builder.addCase(populateUserDetails.pending, (state, action) => {
            console.log("userDetails/populateUserDetails pending");
        });
        builder.addCase(populateUserDetails.fulfilled, (state, action) => {
            console.log("userDetails/populateUserDetails fulfilled");
            console.log(action.payload);
            state = action.payload;
            return state;
        });
        builder.addCase(populateUserDetails.rejected, (state, action) => {
            console.log("userDetails/populateUserDetails rejected");
            // Rejected with thunkAPI.rejectWithValue
            state = action.payload;
            return state;
        });
    },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
