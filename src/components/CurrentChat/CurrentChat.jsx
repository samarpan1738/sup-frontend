import React, { useEffect, useRef, useState } from "react";
import TopBar, { iconMappings, StyledIconContainer, StyledMenu } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import { useDispatch, useSelector } from "react-redux";
import {
    StyledAttachmentIcon,
    BottomBar,
    StyledEmojiIcon,
    IconContainer,
    StyledClosePanelIcon,
} from "./styledComponents";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { deleteConversationMessages, markMessagesRead } from "../../store/slices/conversations/conversationsSlice";
import MessageBox from "../MessageBox/MessageBox";
import MessageList from "../MessageList/MessageList";
import GifPanel from "../GifPanel/GifPanel";
import ConversationService from "../../services/ConversationService";
const styles = {
    "--flex-grow": "2",
    "--justify-content": "space-between",
    "--flex-direction": "column",
    "--display": "flex",
    "--border-right": "none",
};

export const getTimeStamp = (lastActive) => {
    const lastActiveDate = new Date(lastActive);
    const currentTimestamp = new Date();
    const currentDate = currentTimestamp.getDate();
    if (lastActiveDate.getDate() === currentDate)
        return (
            "at " +
            lastActiveDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })
        );
    else
        return (
            "on " +
            lastActiveDate.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            })
        );
};

const CurrentChat = React.memo(({ conversation }) => {
    console.log("Rendering current chat");
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const [isGifPanelOpen, setGifPanelState] = useState(false);
    const toggleMenuState = () => {
        setMenu((prevState) => !prevState);
    };
    const toggleGifPanel = () => {
        setGifPanelState((prevState) => !prevState);
    };
    const dispatch = useDispatch();
    const currentChat = useSelector((store) => store.currentChat);
    const { userId } = useSelector((store) => store.userDetails);

    const clearChat = () => {
        toggleMenuState();
        dispatch(deleteConversationMessages({ conversationId: conversation.id }));
    };
    useEffect(() => {
        // Api call to mark all unread messages as read
        const messageGroups = conversation.messages;
        const unreadMsgIds = [];
        Object.keys(messageGroups).forEach((key) => {
            Object.keys(messageGroups[key]).forEach((msgId) => {
                const { id, read, createdAt } = messageGroups[key][msgId];
                console.log(`id : ${id} , read : ${read}`);
                if (read === false) unreadMsgIds.push({ id: id.toString(), createdAt });
            });
        });
        if (unreadMsgIds.length > 0) {
            ConversationService.markConversationMessagesAsRead(currentChat.conversationId, {
                messageIds: unreadMsgIds.map(({ id }) => id),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Mark read response : ", data);
                });
            dispatch(markMessagesRead({ conversationId: currentChat.conversationId.toString(), unreadMsgIds }));
        }
    }, [currentChat.conversationId, conversation.messages, dispatch]);
    // console.log("Current chat re-render")
    return (
        <StyledSection style={styles}>
            <TopBar avatarUri={currentChat.user.profile_pic_uri} name={currentChat.user.name}>
                <div
                    style={{
                        width: "100%",
                        padding: "0 16px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        if (!currentChat.isProfileOpen) dispatch(setIsProfileOpen(true));
                    }}
                >
                    <p>{currentChat.user.name}</p>
                    <p style={{ fontWeight: "400", fontSize: "12px" }}>
                        last seen {getTimeStamp(currentChat.user.last_active)}
                    </p>
                </div>
                <StyledIconContainer>
                    {/* <button>{iconMappings["search"]}</button> */}
                    <button onClick={toggleMenuState}>{iconMappings["menu"]}</button>
                    {menu === true && (
                        <StyledMenu ref={menuRef}>
                            <div onClick={clearChat}>Clear chat</div>
                        </StyledMenu>
                    )}
                </StyledIconContainer>
            </TopBar>

            <MessageList conversationId={currentChat.conversationId} userId={userId} />
            {isGifPanelOpen && <GifPanel conversationId={currentChat.conversationId} userId={userId} />}
            <BottomBar hideAvatar={true} bgColor={"--bg-bottom-bar"}>
                <IconContainer>
                    <button onClick={toggleGifPanel}>
                        {isGifPanelOpen ? (
                            <StyledClosePanelIcon aria-label="Close gif panel" />
                        ) : (
                            <StyledEmojiIcon aria-label="Open gif panel" />
                        )}
                    </button>
                    <button>
                        <StyledAttachmentIcon />
                    </button>
                </IconContainer>
                <MessageBox conversationId={currentChat.conversationId} userId={userId} />
            </BottomBar>
        </StyledSection>
    );
});

export default CurrentChat;
