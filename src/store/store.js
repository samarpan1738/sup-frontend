import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./slices/userDetails/userDetailsSlice";
import transactionsReducer from "./slices/transactions/transactionsSlice";
import dashboardReducer from "./slices/dashboard/dashboardSlice";
import currentChatReducer from "./slices/currentChat/currentChatSlice";
import socketReducer from "./slices/socket/socketSlice";
import searchUsersReducer from "./slices/searchUsers/searchUsersSlice";
import conversationsReducer from "./slices/conversations/conversationsSlice";
import gifsReducer from "./slices/gifs/gifsSlice";
import modalReducer from "./slices/modal/modalSlice";
// import logger from 'redux-logger'

export default configureStore(
    {
        reducer: {
            userDetails: userDetailsReducer,
            transactions: transactionsReducer,
            dashboard: dashboardReducer,
            currentChat: currentChatReducer,
            socket: socketReducer,
            searchUsers: searchUsersReducer,
            conversations: conversationsReducer,
            gifs:gifsReducer,
            modal:modalReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
