import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar, { iconMappings, StyledIconContainer } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { Avatar } from "@chakra-ui/react";
import { StyledProfile, StyledProfileHeader, StyledProfileSection } from "./styledComponents";
import { StyledProfileActionContainer, StyledDeleteIcon, StyledProfileAction } from "../CurrentGroup/styles";
import { getTimeStamp } from "./CurrentChat";
function ContactInfoPanel({ currentChat }) {
    const dispatch = useDispatch();
    const closeProfile = () => {
        dispatch(setIsProfileOpen(false));
    };
    return (
        <div
            style={{
                flexGrow: "1.2",
                maxWidth: "380px",
                borderLeft: "0.8px solid var(--background4)",
                // backgroundColor: "rgb(240, 240, 240)",
            }}
            className="bg-gray-100"
        >
            <TopBar hideAvatar={true} avatarUri={currentChat.user.profile_pic_uri} name={currentChat.user.name}>
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
                <StyledProfileHeader className="bg-white">
                    <Avatar
                        src={currentChat.user.profile_pic_uri}
                        width="180px"
                        height="180px"
                        borderWidth="2px"
                        borderColor="rgb(45, 106, 79)"
                        marginBottom="20px"
                    />
                    <div className="w-full">
                        <p className="text-2xl mb-1">{currentChat.user.name}</p>
                        <p className="text-sm text-gray-500">last seen {getTimeStamp(currentChat.user.last_active)}</p>
                    </div>
                </StyledProfileHeader>
                <div className="h-3 bg-gray-100"></div>
                <StyledProfileSection className="bg-white">
                    <header
                        style={{
                            color: "#41916c",
                        }}
                        className="mb-2 text-sm"
                    >
                        About and username
                    </header>
                    <p className="border-b border-gray-300 mb-2 pb-2">{currentChat.user.status}</p>
                    <p className="current_chat_username">{currentChat.user.username}</p>
                </StyledProfileSection>
                <div className="h-3 bg-gray-100"></div>
                <StyledProfileActionContainer className="bg-white py-2 px-2">
                    <StyledProfileAction>
                        <StyledDeleteIcon />
                        <p>Delete chat</p>
                    </StyledProfileAction>
                </StyledProfileActionContainer>
            </StyledProfile>
        </div>
    );
}

export default ContactInfoPanel;
