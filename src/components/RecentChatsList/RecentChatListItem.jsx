import React from "react";
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
function RecentChatListItem({ conversation }) {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.userDetails);
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
        conversationAvatarUri = "https://avatars.dicebear.com/api/human/john.svg";
    let contact = null;
    if (type === "CONTACT") {
        // Only 2 users
        contact = users[0].user;
        if (contact.id === userId) contact = users[1].user;
        conversationTitle = contact.name;
        conversationAvatarUri = contact.profile_pic_uri;
    }

    const fetchUserDetails = () => {
        // Fetch user details from API
        dispatch(
            setCurrentChat({
                isProfileOpen: false,
                conversationId: id,
                user: {
                    name: conversationTitle,
                    username: contact != null ? contact.username : null,
                    lastSeen: contact != null ? contact.last_active : "yestersay",
                    profilePicUrl: conversationAvatarUri,
                    status: "Hey there! I'm using sup",
                    blocked: true,
                },
            })
        );
        // setTimeout(()=>{
        dispatch(resetUnreadCounter(id));
        // },3000);
    };
    /**
     font-weight : ${props=>props.unread?"700":"normal"};
     */
    return (
        <StyledListItem onClick={fetchUserDetails}>
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
}

export default RecentChatListItem;
