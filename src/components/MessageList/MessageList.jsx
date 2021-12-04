import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    StyledMessageBox,
    StyledMessagesList,
    StyledMessagesListItem,
    StyledDateLabel,
    StyledMessageGroup,
    NoMessagesLabel,
} from "../CurrentChat/styledComponents";

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
const getMessageTimestamp = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleString("en-US", {
        timeStyle: "short",
    });
};

function MessageList({ conversationId, userId }) {
    const messageListRef = useRef(null);
    const conversations = useSelector((store) => store.conversations);
    const messages = conversations[conversationId].messages;
    useEffect(() => {
        if (messageListRef.current !== null) messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
    }, [messages, conversationId]);
    if(Object.keys(messages).length === 0)
    {
        return <NoMessagesLabel>No messages yet</NoMessagesLabel>
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
                            const message = messages[gdate][msgId];
                            const messageType = message.sender_id === userId ? "sent" : "received";
                            return (
                                <>
                                    <StyledMessagesListItem type={messageType}>
                                        <StyledMessageBox>
                                            <div className="StyledMessageBox_content">{message.text}</div>
                                            <div style={{ color: "#565353" }} className="StyledMessageBox_timestamp">
                                                {getMessageTimestamp(message.createdAt)}
                                            </div>
                                        </StyledMessageBox>
                                    </StyledMessagesListItem>
                                </>
                            );
                        })}
                    </StyledMessageGroup>
                );
            })}
        </StyledMessagesList>
    );
}

export default MessageList;
