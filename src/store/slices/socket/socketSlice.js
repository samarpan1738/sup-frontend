import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {io} from "socket.io-client";
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? "http://localhost:2000"
        : process.env.REACT_APP_BACKEND_PROD_URL;
console.log("socketSlice urlPrefix : ",urlPrefix)
export const socket = io(urlPrefix);
socket.on("connect", (data) => {
    console.log("Connected to socket server");
    
});
// socket.on("message", (data) => {
//     console.log("message from socket server : ",data);
// });

export const sendViaSocket = createAsyncThunk("socket/sendViaSocket", async ({ path, data }, thunkAPI) => {
    try {
        console.log(`path : ${path} , data : ${data}`);
        socket.emit(path, data);
        return { path, data };
    } catch (error) {
        return thunkAPI.rejectWithValue("Error while sending data via socket");
    }
});
// socket.emit("connectionCount")
// return () => {
//     console.log("App Cleanup fn")
//     socket.disconnect()
//     socket.close()
// }
export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        connected:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendViaSocket.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("sendViaSocket.pending");
            // console.log(action.payload)
        });
        builder.addCase(sendViaSocket.fulfilled, (state, action) => {
            console.log("sendViaSocket.fulfilled");
            console.log(action.payload);
            // state.searchResults = action.payload.data;
            // state = { ...state, ...action.payload };
            // return state;
        });
        builder.addCase(sendViaSocket.rejected, (state, action) => {
            console.log("sendViaSocket.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
            // Error in payloadCreator callback
            console.log(action.error);
        });
    },
});

// Action creators are generated for each case reducer function
// export const {} = socketSlice.actions;
export default socketSlice.reducer;

