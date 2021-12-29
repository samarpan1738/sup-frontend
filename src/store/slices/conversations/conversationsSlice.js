import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;

export const deleteConversationMessages = createAsyncThunk(
    "conversations/clearChat",
    async ({ conversationId }, thunkAPI) => {
        try {
            const res = await fetch(`${urlPrefix}/api/conversations/${conversationId}/messages`, {
                method: "delete",
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                // dispatch(setConversationMessages({ id: conversationId, data: {} }));

                return { id: conversationId, data: {} };
            } else {
                thunkAPI.rejectWithValue("Unable to clear chat");
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error while fetching users by query text");
        }
    }
);

export const fetchConversations = createAsyncThunk(
    "conversations/fetchConversations",
    async ({ history }, thunkAPI) => {
        try {
            const res = await fetch(`${urlPrefix}/api/conversations`, {
                credentials: "include",
            });

            if (res.status === 401 || res.status === 403) {
                // Handle this error
                return;
            }

            const data = await res.json();
            console.log(data);

            if (data.success === true) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
            thunkAPI.rejectWithValue("Error fetching conversations");
        }
    }
);
export const addConversation = createAsyncThunk(
    "conversations/addConversation",
    async ({ userId, type, history }, thunkApi) => {
        const res = await fetch(`${urlPrefix}/api/conversations/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                users: [userId],
                type,
            }),
        });

        if (res.status === 401 || res.status === 403) {
            return history.push("/login");
        }
        const data = await res.json();

        console.log("data : ", data);
        if (data.success) {
            return data.data;
        } else {
            thunkApi.rejectWithValue("Error adding conversation");
        }
    }
);

export const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {},
    reducers: {
        setConversations: (state, action) => {},
        setConversation: (state, action) => {
            state[action.payload.id] = action.payload;
        },
        addMessageToConversation: (state, action) => {
            const conversationId = action.payload.data.conversation_id.toString();
            const messageId = action.payload.data.id.toString();
            console.log("state[conversationId] : ", state[conversationId]);
            const messages = state[conversationId].messages;
            const groupKey = action.payload.data.createdAt.substring(0, 10);
            if (!messages[groupKey]) messages[groupKey] = {};
            const isMsgRead = action.payload.myId === action.payload.data.sender_id;
            messages[groupKey][messageId] = { ...action.payload.data, read: isMsgRead };
            if (action.payload.currentConversationId !== action.payload.data.conversation_id && !isMsgRead)
                state[conversationId].unreadCounter++;
            return state;
        },
        setConversationMessages: (state, action) => {
            state[action.payload.id].messages = action.payload.data;
            if (action.payload.data.length === 0) state[action.payload.id].unreadCounter = 0;
        },
        resetUnreadCounter: (state, action) => {
            state[action.payload.toString()].unreadCounter = 0;
        },
        markMessagesRead: (state, action) => {
            console.log(action.payload);
            const { conversationId, unreadMsgIds } = action.payload;
            if (state[conversationId]) {
                const convMsgs = state[conversationId].messages;
                unreadMsgIds.forEach(({ id, createdAt }) => {
                    convMsgs[createdAt.substring(0, 10)][id].read = true;
                });
            }
            // state[action.payload.toString()].unreadCounter = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteConversationMessages.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("deleteConversationMessages.pending");
            // console.log(action.payload)
        });
        builder.addCase(deleteConversationMessages.fulfilled, (state, action) => {
            console.log("deleteConversationMessages.fulfilled");
            console.log(action.payload);
            const { id } = action.payload;
            state[id].messages = action.payload.data;
            return state;
        });
        builder.addCase(deleteConversationMessages.rejected, (state, action) => {
            console.log("deleteConversationMessages.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
            // Error in payloadCreator callback
            console.log(action.error);
        });

        //* For fetchConversations thunk
        builder.addCase(fetchConversations.pending, (state, action) => {
            // Data returned by payloadCreator callback
            console.log("fetchConversations.pending");
            // console.log(action.payload)
        });
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            console.log("fetchConversations.fulfilled");
            console.log(action.payload);
            state = action.payload;
            return state;
        });
        builder.addCase(fetchConversations.rejected, (state, action) => {
            console.log("fetchConversations.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
            // Error in payloadCreator callback
            console.log(action.error);
        });

        //* For addConversation thunk
        builder.addCase(addConversation.pending, (state, action) => {
            console.log("fetchConversations.pending");
        });
        builder.addCase(addConversation.fulfilled, (state, action) => {
            console.log("fetchConversations.fulfilled");
            console.log(action.payload);
            state = { ...state, ...action.payload };
            return state;
        });
        builder.addCase(addConversation.rejected, (state, action) => {
            console.log("fetchConversations.rejected");
            // Rejected with thunkAPI.rejectWithValue
            console.log(action.payload);
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    setConversations,
    setConversation,
    addMessageToConversation,
    resetUnreadCounter,
    setConversationMessages,
    markMessagesRead,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
