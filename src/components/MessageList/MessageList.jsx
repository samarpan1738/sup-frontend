import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    StyledMessagesList,
    StyledDateLabel,
    StyledMessageGroup,
    NoMessagesLabel,
} from "../CurrentChat/styledComponents";
import MessageListItem from "./MessageListItem";

const getDate = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const currentDate = new Date();
    console.log(`date.getDay() : ${date.getDay()} , currentDate.getDay() : ${currentDate.getDay()}`);
    if (date.getDate() === currentDate.getDate()) return "Today";
    else if (date.getDate() + 1 === currentDate.getDate()) return "Yesterday";
    else
        return date.toLocaleString("en-US", {
            dateStyle: "full",
        });
};

function MessageList({ conversationId, userId }) {
    const messageListRef = useRef(null);
    const conversations = useSelector((store) => store.conversations);
    const messages = conversations[conversationId].messages;
    
    useEffect(() => {
        if (messageListRef.current !== null) messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
    }, [messages, conversationId]);
    if (Object.keys(messages).length === 0) {
        return <NoMessagesLabel>No messages yet</NoMessagesLabel>;
    }

    return (
        <StyledMessagesList type="none" ref={messageListRef}>
            {Object.keys(messages).map((gdate, idx) => {
                const msgIds = Object.keys(messages[gdate]);
                const lastMsg = messages[gdate][msgIds[msgIds.length - 1]];
                return (
                    <StyledMessageGroup>
                        <StyledDateLabel>{getDate(lastMsg.createdAt)}</StyledDateLabel>
                        {Object.keys(messages[gdate]).map((msgId) => {
                            return <MessageListItem conversationType={conversations[conversationId].type} users={conversations[conversationId].users} message={messages[gdate][msgId]} userId={userId} key={msgId}/>;
                        })}
                    </StyledMessageGroup>
                );
            })}
        </StyledMessagesList>
    );
}

export default MessageList;
