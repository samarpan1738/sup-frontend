import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteConversationMessages = createAsyncThunk(
    "conversations/clearChat",
    async ({ conversationId }, thunkAPI) => {
        try {
            const res = await fetch(`/api/conversations/${conversationId}/messages`, {
                method: "delete",
            });
            const data = await res.json();
            if (data.success) {
                // dispatch(setConversationMessages({ id: conversationId, data: {} }));
                return { id: conversationId, data: {} };
                // toast({
                //     title: data.message,
                //     status: "success",
                //     duration: 5000,
                //     isClosable: true,
                // });
            } else {
                // toast({
                //     title: "Unable to clear chat",
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                // });
                thunkAPI.rejectWithValue("Unable to clear chat");
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error while fetching users by query text");
        }
    }
);

export const fetchConversations = createAsyncThunk("conversations/fetchConversations", async ({history}, thunkAPI) => {
    try {
        const res = await fetch("/api/conversations");

        if (res.status === 401 || res.status === 403) {
            return history.push("/login");
        }

        const data = await res.json();
        console.log(data);
        
        if (data.success === true) {
            const conversationSliceInp = {};
            data.data.forEach((conv) => {
                console.log("conv :", conv);
                // conv.unreadCounter=0;
                conv = { ...conv, unreadCounter: 0 };
                const conversationUsersObj={};
                conv.users.forEach(({user})=>{
                    conversationUsersObj[user.id]=user;
                })
                conv.users=conversationUsersObj;
                conversationSliceInp[conv.id.toString()] = conv;
            });
            
            console.log("conversationSliceInp : ", conversationSliceInp);
            return conversationSliceInp;
        }
    } catch (error) {
        console.log(error)
        thunkAPI.rejectWithValue("Error fetching conversations");
    }
});

export const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {},
    reducers: {
        setConversations: (state, action) => {
            
        },
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


            const conversations = action.payload;
            Object.keys(conversations).forEach((id) => {
                const groupedMessages = {};
                const messages = conversations[id].messagesForUser;
                messages.forEach(({ message, read }) => {
                    const groupKey = message.createdAt.substring(0, 10);

                    // if (groupedMessages[groupKey] === undefined) groupedMessages[groupKey] = [];

                    // groupedMessages[groupKey].push({ ...message, read });

                    if (groupedMessages[groupKey] === undefined) groupedMessages[groupKey] = {};
                    groupedMessages[groupKey][message.id.toString()] = { ...message, read };

                    if (read === false) ++conversations[id].unreadCounter;
                });
                delete conversations[id].messagesForUser;
                conversations[id].messages = groupedMessages;
            });
            console.log("After grouping conversations : ", conversations);
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
