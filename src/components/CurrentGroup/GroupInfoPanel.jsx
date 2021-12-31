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
    StyledExitIcon,
} from "./styles";
import { StyledDetailsContainer, StyledListItem } from "../RecentChatsList/styles";
function GroupInfoPanel() {
    const dispatch = useDispatch();
    const currentChat = useSelector((store) => store.currentChat);
    const conversations = useSelector((store) => store.conversations);
    const { userId, name, status, profile_pic_uri } = useSelector((store) => store.userDetails);
    const currentConversation = conversations[currentChat.conversationId];
    const usersCount = Object.keys(currentConversation.users).length;
    const createdByName =
        currentConversation.createdBy.id == userId
            ? "you"
            : currentConversation.users[currentConversation.createdBy.id].name;
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
                <div
                    style={{
                        flexGrow: "1.2",
                        maxWidth: "380px",
                        borderLeft: "0.8px solid var(--background4)",
                        // backgroundColor: "rgb(240, 240, 240)",
                    }}
                    className="bg-gray-100"
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
                        <StyledProfileHeader className="bg-white">
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
                        <StyledProfileSection className="bg-white">
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
                                Group created by {createdByName} on {createdAtDate} at {createdAtTime}
                            </p>
                        </StyledProfileSection>
                        <div className="h-3"></div>
                        <div
                            style={{
                                padding: "16px 24px",
                            }}
                            className="bg-white flex flex-col"
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
                                <div className="flex items-center">
                                    <Avatar src={profile_pic_uri} width="38px" height="38px" />
                                    <div className="px-3">
                                        <p className="text-base font-semibold">You</p>
                                        <p className="text-sm text-gray-700">{status}</p>
                                    </div>
                                </div>
                                <div className="h-1"></div>
                                {Object.keys(currentConversation.users).map((id, idx) => {
                                    const user = currentConversation.users[id];
                                    return (
                                        <>
                                            <div className="flex items-center">
                                                <Avatar src={user.profile_pic_uri} width="38px" height="38px" />
                                                <div className="px-3">
                                                    <p className="text-base font-semibold">{user.name}</p>
                                                    <p className="text-sm text-gray-700">{user.status}</p>
                                                </div>
                                            </div>
                                            {idx !== Object.keys(currentConversation.users).length - 1 && (
                                                <div className="h-1"></div>
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="h-3"></div>
                        <StyledProfileActionContainer className="bg-white py-2 px-2">
                            <StyledProfileAction>
                                <StyledDeleteIcon />
                                <p>Delete chat</p>
                            </StyledProfileAction>
                            <div className="h-5"></div>
                            <StyledProfileAction>
                                <StyledExitIcon />
                                <p>Exit group</p>
                            </StyledProfileAction>
                        </StyledProfileActionContainer>
                        <div className="h-12"></div>
                    </StyledProfile>
                </div>
            )}
        </>
    );
}

export default GroupInfoPanel;
