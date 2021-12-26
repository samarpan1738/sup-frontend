import React from "react";
import { flushSync } from "react-dom";
import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../../store/slices/currentChat/currentChatSlice";
import { useSelector } from "react-redux";
import { StyledDetailsContainer, StyledListItem, StyledUnreadCounter } from "./styles";
import { resetUnreadCounter } from "../../store/slices/conversations/conversationsSlice";
const getTimestamp = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentTimestamp = new Date();
    const currentDate = currentTimestamp.getDate();
    if (createdAtDate.getDate() === currentDate)
        return createdAtDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    else
        return createdAtDate.toLocaleString("en-US", {
            dateStyle: "short",
        });
};
const RecentChatListItem = React.memo(({ conversation }) => {
    console.log(`Rendering conversations list item ${conversation.id}`);
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.userDetails);
    const currentChat = useSelector((state) => state.currentChat);
    const { title, type, users, id } = conversation;
    let lastMsg = null;
    const msgDateGroups = Object.keys(conversation.messages);
    console.log("msgDateGroupsCnt : ", msgDateGroups.length);
    if (msgDateGroups.length > 0) {
        const lastMsgGroup = conversation.messages[msgDateGroups[msgDateGroups.length - 1]];
        const msgIds = Object.keys(lastMsgGroup);
        lastMsg = lastMsgGroup[msgIds[msgIds.length - 1]];
        console.log("lastMsg : ", lastMsg);
    }
    let timestamp = "";
    if (lastMsg !== null) {
        timestamp = getTimestamp(lastMsg.createdAt);
    }

    let conversationTitle = title,
        conversationAvatarUri = conversation.conversationIconUrl;
    let contact = null;
    if (type === "CONTACT") {
        // Only 2 users
        contact = users[Object.keys(users)[0]];
        console.log(`${typeof Object.keys(users)[0]} == ${typeof userId}`)
        if (Object.keys(users)[0] == userId) contact = users[Object.keys(users)[1]];
        console.log("contact : ",contact);
        conversationTitle = contact.name;
        conversationAvatarUri = contact.profile_pic_uri;
    }

    const setCurrentConversation = () => {
        // Fetch user details from API
        console.log("currentChat before flushsync: ", currentChat);
        // if (currentChat.conversationId !== id) {
        flushSync(() => {
            dispatch(
                setCurrentChat({
                    isProfileOpen: false,
                    conversationId: id,
                    user: contact,
                })
            );
        });
        console.log("currentChat after flushsync: ", currentChat);
        dispatch(resetUnreadCounter(id));
        // }
    };
    /**
     font-weight : ${props=>props.unread?"700":"normal"};
     */
    return (
        <StyledListItem onClick={setCurrentConversation}>
            <Avatar src={conversationAvatarUri} width="38px" height="38px" />
            <StyledDetailsContainer>
                <p>
                    <span>{conversationTitle}</span> <span>{timestamp}</span>
                    {conversation.unreadCounter > 0 && (
                        <StyledUnreadCounter>{conversation.unreadCounter}</StyledUnreadCounter>
                    )}
                </p>

                <p className="conversation_last_message">
                    {lastMsg !== null
                        ? lastMsg.type === "IMAGE"
                            ? "GIF"
                            : lastMsg.text
                        : "This is the start of this conversation"}
                </p>
            </StyledDetailsContainer>
        </StyledListItem>
    );
});

export default RecentChatListItem;
