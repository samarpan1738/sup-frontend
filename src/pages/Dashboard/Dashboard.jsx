import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import ContactInfoPanel from "../../components/CurrentChat/ContactInfoPanel";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import FeatureList from "../../components/FeatureList/FeatureList";
import { setUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import SearchUsersModal from "../../components/SearchUsersModal/SearchUsersModal";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import CurrentGroup from "../../components/CurrentGroup/CurrentGroup";
import GroupInfoPanel from "../../components/CurrentGroup/GroupInfoPanel";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Settings from "../../components/Settings/Settings";
import AddGroupParticipantsModal from "../../components/AddGroupParticipantsModal/AddGroupParticipantsModal";
const StyledDashboard = styled.div`
    background-color: white;
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
`;

function Dashboard() {
    const { conversationId } = useSelector((state) => state.currentChat);
    const conversations = useSelector((state) => state.conversations);
    const { search: isSearchModalOpen, createGroup: isGroupModalOpen,addGroupParticipants:isAddGroupParticipantsModalOpen } = useSelector((state) => state.modal);
    const { isAuthenticated, tokenExpired } = useSelector((state) => state.userDetails);
    const { isSettingsOpen } = useSelector((state) => state.dashboard);
    const currentChat  = useSelector((state) => state.currentChat);
    console.log("Dashboard isAuthenticated : ", isAuthenticated);
    return isAuthenticated ? (
        <StyledDashboard>
            {isSearchModalOpen && <SearchUsersModal />}
            {isAddGroupParticipantsModalOpen && <AddGroupParticipantsModal currentConversationId ={conversationId}/>}
            {isGroupModalOpen && <CreateGroupModal />}
            <Sidebar />
            {isSettingsOpen ? <Settings/> : conversationId && conversations[conversationId] ? (
                conversations[conversationId].type === "CONTACT" ? (
                    <>
                        <CurrentChat conversation={conversations[conversationId]} />
                        {currentChat.isProfileOpen && <ContactInfoPanel currentChat={currentChat}/>}
                    </>
                ) : (
                    <>
                        <CurrentGroup conversation={conversations[conversationId]} />
                        {currentChat.isProfileOpen && <GroupInfoPanel currentChat={currentChat}/>}
                    </>
                )
            ) : (
                <FeatureList />
            )}
            {/* <Settings/> */}
        </StyledDashboard>
    ) : 
    !tokenExpired ? (
        <Loader/>
    ) : (
        <Navigate to="/login" />
    );
}

export default Dashboard;
