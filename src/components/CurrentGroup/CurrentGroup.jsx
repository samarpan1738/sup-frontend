import React, { useEffect, useRef, useState } from "react";
import TopBar, { iconMappings, StyledIconContainer, StyledMenu } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import { useDispatch, useSelector } from "react-redux";
import { StyledAttachmentIcon, BottomBar, StyledEmojiIcon, IconContainer, StyledClosePanelIcon } from "./styles";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { markMessagesRead, setConversationMessages } from "../../store/slices/conversations/conversationsSlice";
import { useToast } from "@chakra-ui/react";
import MessageBox from "../MessageBox/MessageBox";
import MessageList from "../MessageList/MessageList";
import GifPanel from "../GifPanel/GifPanel";

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
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;
function CurrentGroup({ conversation }) {
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const [isGifPanelOpen, setGifPanelState] = useState(false);
    const toggleMenuState = () => {
        setMenu((prevState) => !prevState);
    };
    const toggleGifPanel = () => {
        setGifPanelState((prevState) => !prevState);
    };

    const toast = useToast();
    const dispatch = useDispatch();
    const currentChat = useSelector((store) => store.currentChat);
    const { accessToken, userId } = useSelector((store) => store.userDetails);

    const clearChat = () => {
        toggleMenuState();
        fetch(`${urlPrefix}/api/conversations/${currentChat.conversationId}/messages`, {
            method: "delete",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(setConversationMessages({ id: currentChat.conversationId, data: {} }));
                    toast({
                        title: data.message,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Unable to clear chat",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
            fetch(`${urlPrefix}/api/conversations/${currentChat.conversationId}/messages/markRead`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    messageIds: unreadMsgIds.map(({ id }) => id),
                }),
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
            <TopBar avatarUri={conversation.conversationIconUrl}>
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
                    <p>{conversation.title}</p>
                    <p style={{ fontWeight: "400", fontSize: "12px" }}>
                        {Object.keys(conversation.users)
                            .map((id) => conversation.users[id].name.split(" ")[0])
                            .sort()
                            .join(", ") + ", You"}
                    </p>
                </div>
                <StyledIconContainer>
                    <button>{iconMappings["search"]}</button>
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
            <BottomBar hideAvatar={true} bgColor={"--background10"} bt="1px solid var(--background4)">
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
}

export default CurrentGroup;
