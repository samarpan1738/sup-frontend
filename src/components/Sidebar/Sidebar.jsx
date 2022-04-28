import React, { useEffect, useState, useRef } from "react";
import TopBar, { iconMappings, StyledIconContainer, StyledMenu } from "../../globals/styledComponents/TopBar";
import StyledSection from "../../globals/styledComponents/StyledSection";
import List from "../RecentChatsList/List";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../store/slices/socket/socketSlice";
import { addMessageToConversation, fetchConversations } from "../../store/slices/conversations/conversationsSlice";
import styled from "styled-components";
import { setUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import { setModalOpen } from "../../store/slices/modal/modalSlice";
import { setDashboard } from "../../store/slices/dashboard/dashboardSlice";
import { GrSettingsOption, GrLogout, GrGroup } from "react-icons/gr"
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const styles = {
    "--flex-grow": "1.1",
    "--max-width": "400px",
    "--border-right": "0.8px solid var(--background4)",
};
const DropdownMenuItem = styled.div`
    // height: 40px;
    display: flex;
    align-items: center;
    &:not(:last-child) {
        border-bottom: 0.8px solid var(--background4);
    }
`;

function Sidebar() {
    const { isAuthenticated, userId, profile_pic_uri } = useSelector((state) => state.userDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.currentChat);
    const conversations = useSelector((state) => state.conversations);
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const toggleMenuState = () => {
        setMenu((prevState) => !prevState);
    };
    const openModal = (target) => {
        dispatch(setModalOpen({ target, value: true }));
    };
    useEffect(() => {
        if (isAuthenticated === true) {
            dispatch(fetchConversations({}));
        }
    }, [isAuthenticated, dispatch]);
    const logout = function () {
        AuthService.logoutUser()
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    return navigate("/login");
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch(setUserDetails({ isAuthenticated: false, tokenExpired: true }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const conversationIds = Object.keys(conversations);
    const conversationsLength = conversationIds.length;
    useEffect(() => {
        // console.log("Setting message event listener");
        socket.removeAllListeners("message");
        socket.on("message", (data) => {
            // console.log("socket message : ", data, " , currentChat.conversationId : ", currentChat.conversationId);
            // data.currentConversationId=currentChat.conversationId;
            // data = { ...data, currentConversationId: currentChat.conversationId };
            dispatch(
                addMessageToConversation({ data, currentConversationId: currentChat.conversationId, myId: userId })
            );
        });
        // console.log("message event listeners : ", socket.listeners("message"));
    }, [currentChat.conversationId, dispatch, userId]);
    useEffect(() => {
        // console.log("conversations.length : ", Object.keys(conversations).length);
        // console.log("conversations : ",conversations)
        if (conversationsLength > 0)
            socket.emit(
                "joinRooms",
                conversationIds.map((id) => id.toString())
            );
    }, [conversationsLength, conversationIds]);
    return (
        <StyledSection style={styles}>
            <TopBar avatarUri={profile_pic_uri}>
                <StyledIconContainer>
                    <button onClick={() => openModal("search")}>{iconMappings["search"]}</button>
                    <button onClick={toggleMenuState}>{iconMappings["menu"]}</button>
                    {menu === true && (
                        <StyledMenu ref={menuRef} onClick={toggleMenuState}>
                            <DropdownMenuItem onClick={() => openModal("createGroup")}><GrGroup /> <div className="w-4"></div>Create Group</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch(setDashboard({ isSettingsOpen: true }))}><GrSettingsOption /> <div className="w-4"></div> Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}><GrLogout /><div className="w-4"></div>Log out</DropdownMenuItem>
                        </StyledMenu>
                    )}
                </StyledIconContainer>
            </TopBar>
            <List />
        </StyledSection>
    );
}

export default Sidebar;
