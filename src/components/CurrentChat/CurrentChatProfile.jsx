import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar, { iconMappings, StyledIconContainer, StyledMenu } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { Avatar } from "@chakra-ui/react";
import {
    StyledProfile,
    StyledProfileHeader,
    StyledProfileSection,
    StyledBlockIcon,
    StyledProfileAction,
    StyledDeleteIcon,
    StyledReportIcon,
    StyledProfileActionContainer,
} from "./styledComponents";
import { getTimeStamp } from "./CurrentChat";
function CurrentChatProfile() {
    const dispatch = useDispatch();
    const currentChat = useSelector((store) => store.currentChat);
    const closeProfile = () => {
        dispatch(setIsProfileOpen(false));
    };
    return (
        <>
            {currentChat.isProfileOpen && (
                <StyledSection
                    style={{
                        "--flex-grow": "1.2",
                        "--max-width": "500px",
                        "--border-left": "0.8px solid var(--background4)",
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
                            <p>Contact Info</p>
                        </div>
                        <StyledIconContainer>
                            <button onClick={closeProfile}>{iconMappings["close"]}</button>
                        </StyledIconContainer>
                    </TopBar>

                    <StyledProfile>
                        <StyledProfileHeader>
                            <Avatar
                                name="Dan Abrahmov"
                                src={currentChat.user.profilePicUrl}
                                width="180px"
                                height="180px"
                                borderWidth="2px"
                                borderColor="rgb(45, 106, 79)"
                                marginBottom="20px"
                            />
                            <div style={{ width: "100%" }}>
                                <p
                                    style={{
                                        fontSize: "20px",
                                        marginBottom: "6px",
                                    }}
                                >
                                    {currentChat.user.name}
                                </p>
                                <p
                                    style={{
                                        color: "grey",
                                        fontSize: "14px",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    last seen {getTimeStamp(currentChat.user.lastSeen)}
                                </p>
                            </div>
                        </StyledProfileHeader>
                        <StyledProfileSection>
                            <header>About and username</header>
                            <p className="current_chat_status">{currentChat.user.status}</p>
                            <p className="current_chat_username">{currentChat.user.username}</p>
                        </StyledProfileSection>
                        {/* <StyledProfileSeperator /> */}
                        <StyledProfileActionContainer>
                            <StyledProfileAction>
                                <StyledBlockIcon />
                                <p>{currentChat.user.blocked ? "Unblock" : "Block"}</p>
                            </StyledProfileAction>

                            <StyledProfileAction>
                                <StyledDeleteIcon />
                                <p>Delete chat</p>
                            </StyledProfileAction>

                            <StyledProfileAction>
                                <StyledReportIcon />
                                <p>Report contact</p>
                            </StyledProfileAction>
                        </StyledProfileActionContainer>
                    </StyledProfile>
                </StyledSection>
            )}
        </>
    );
}

export default CurrentChatProfile;
