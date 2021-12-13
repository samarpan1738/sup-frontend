import { createSlice, current } from "@reduxjs/toolkit";

export const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {},
    reducers: {
        setConversations: (state, action) => {
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
        },
        setConversation: (state, action) => {
            state[action.payload.id] = action.payload;
        },
        addMessageToConversation: (state, action) => {
            const conversationId=action.payload.data.conversation_id.toString();
            const messageId=action.payload.data.id.toString();
            console.log("state[conversationId] : ",state[conversationId])
            const messages = state[conversationId].messages;
            const groupKey = action.payload.data.createdAt.substring(0, 10);
            if (!messages[groupKey]) messages[groupKey] = {};
            const isMsgRead = action.payload.myId === action.payload.data.sender_id;
            messages[groupKey][messageId] = { ...action.payload.data, read: isMsgRead};
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
