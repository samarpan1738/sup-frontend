import React from "react";
import { StyledGifBox, StyledMessageBox, StyledMessagesListItem } from "../CurrentGroup/styles";

const getMessageTimestamp = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleString("en-US", {
        timeStyle: "short",
    });
};

const MessageListItem = React.memo(
    ({ conversationType, message, userId, users }) => {
        console.log(`Rendering message list item ${message.id}`);
        const messageType = message.sender_id === userId ? "sent" : "received";
        return (
            <StyledMessagesListItem type={messageType}>
                {message.type === "TEXT" ? (
                    <StyledMessageBox>
                        {conversationType === "GROUP" && (
                            <div className="text-pink-500 font-semibold pl-1 pb-1">{message.sender_id == userId ? "You" : users[message.sender_id].name}</div>
                        )}
                        <div className="text-message">
                            <span className="StyledMessageBox_text">{message.text}</span>
                            <span className="StyledMessageBox_spacer"></span>
                        </div>
                        <div style={{ color: "#565353" }} className="StyledMessageBox_timestamp">
                            {getMessageTimestamp(message.createdAt)}
                        </div>
                    </StyledMessageBox>
                ) : (
                    <StyledGifBox padding="">
                        <img className="StyledMessageBox_img" src={message.file_uri} alt="Gif" />
                        <div style={{ color: "white" }} className="StyledMessageBox_timestamp">
                            {getMessageTimestamp(message.createdAt)}
                        </div>
                    </StyledGifBox>
                )}
            </StyledMessagesListItem>
        );
    },
    (prevProps, nextProps) => {
        console.log("prevProps : ", prevProps);
        return prevProps.message.id === nextProps.message.id;
    }
);

export default MessageListItem;
