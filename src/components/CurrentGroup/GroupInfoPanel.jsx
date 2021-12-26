import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar, { iconMappings, StyledIconContainer } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { Avatar } from "@chakra-ui/react";
import {
    StyledProfile,
    StyledProfileHeader,
    StyledProfileSection,
    StyledProfileAction,
    StyledDeleteIcon,
    StyledProfileActionContainer,
} from "./styles";
import { StyledDetailsContainer, StyledListItem } from "../RecentChatsList/styles";
function GroupInfoPanel() {
    const dispatch = useDispatch();
    const currentChat = useSelector((store) => store.currentChat);
    const conversations = useSelector((store) => store.conversations);
    const currentConversation = conversations[currentChat.conversationId];
    const usersCount = Object.keys(currentConversation.users).length;
    const createdBy = currentConversation.users[currentConversation.createdBy.id];
    const closeProfile = () => {
        dispatch(setIsProfileOpen(false));
    };
    const createdAtDate = new Date(currentConversation.createdAt).toLocaleDateString();
    const createdAtTime = new Date(currentConversation.createdAt).toLocaleTimeString("en-US", {
        hour12: true,
        timeStyle: "short",
    });
    return (
        <>
            {currentChat.isProfileOpen && (
                <StyledSection
                    style={{
                        "--flex-grow": "1.2",
                        "--max-width": "500px",
                        "--border-left": "0.8px solid var(--background4)",
                        backgroundColor:"rgb(230, 230, 230)"
                    }}
                >
                    <TopBar hideAvatar>
                        <div
                            style={{
                                width: "100%",
                                padding: "0 16px",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                            onClick={() => dispatch(setIsProfileOpen(true))}
                        >
                            <p>Group Info</p>
                        </div>
                        <StyledIconContainer>
                            <button onClick={closeProfile}>{iconMappings["close"]}</button>
                        </StyledIconContainer>
                    </TopBar>

                    <StyledProfile>
                        <StyledProfileHeader className="bg-gray-100">
                            <Avatar
                                src={currentConversation.conversationIconUrl}
                                width="180px"
                                height="180px"
                                borderWidth="2px"
                                borderColor="rgb(45, 106, 79)"
                                marginBottom="20px"
                            />
                            <div className="w-full">
                                <p className="text-2xl text-center mb-1">{currentConversation.title}</p>
                                <p className="text-sm text-center text-gray-500">Group . {usersCount} participants</p>
                            </div>
                        </StyledProfileHeader>
                        <div className="h-3"></div>
                        <StyledProfileSection className="bg-gray-100">
                            <header
                                style={{
                                    color: "#41916c",
                                }}
                                className="mb-2 text-sm"
                            >
                                Group Description
                            </header>
                            <p>{currentConversation.description}</p>
                            <div className="h-2"></div>
                            <p className="text-sm text-gray-500">
                                Group created by {createdBy.name} on {createdAtDate} at {createdAtTime}
                            </p>
                        </StyledProfileSection>
                        <div className="h-3"></div>
                        <div
                            style={{
                                padding: "16px 24px",
                            }}
                            className="bg-gray-100 flex flex-col"
                        >
                            <header
                                style={{
                                    color: "#41916c",
                                }}
                                className="mb-2 text-sm"
                            >
                                Participants
                            </header>
                            <div className="h-2"></div>
                            <div className="space-y-1.5">
                                {Object.keys(currentConversation.users).map((id) => {
                                    const user=currentConversation.users[id];
                                    return (
                                        <StyledListItem noHoverEffects noPadding cursor="auto" className="">
                                            <Avatar src={user.profile_pic_uri} width="38px" height="38px" />
                                            <StyledDetailsContainer noBottomBorder>
                                                <p>
                                                    <span>{user.name}</span>
                                                </p>

                                                <p className="conversation_last_message">{user.status}</p>
                                            </StyledDetailsContainer>
                                        </StyledListItem>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="h-3"></div>
                        <StyledProfileActionContainer className="bg-gray-100 py-2 px-2">
                            <StyledProfileAction>
                                <StyledDeleteIcon />
                                <p>Delete chat</p>
                            </StyledProfileAction>
                            <div className="h-5"></div>
                            <StyledProfileAction>
                                <StyledDeleteIcon />
                                <p>Exit group</p>
                            </StyledProfileAction>
                        </StyledProfileActionContainer>
                        <div className="h-12"></div>
                    </StyledProfile>
                </StyledSection>
            )}
        </>
    );
}

export default GroupInfoPanel;
