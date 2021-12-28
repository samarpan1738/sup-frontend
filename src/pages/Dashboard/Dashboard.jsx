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
import { Redirect } from "react-router";
import Loader from "../../components/Loader/Loader";

const StyledDashboard = styled.div`
    background-color: var(--background2);
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
`;
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;
function Dashboard() {
    const { conversationId } = useSelector((state) => state.currentChat);
    const conversations = useSelector((state) => state.conversations);
    const { search: isSearchModalOpen, createGroup: isGroupModalOpen } = useSelector((state) => state.modal);
    const { isAuthenticated, tokenExpired } = useSelector((state) => state.userDetails);
    console.log("Dashboard isAuthenticated : ", isAuthenticated);
    return isAuthenticated ? (
        <StyledDashboard>
            {isSearchModalOpen && <SearchUsersModal />}
            {isGroupModalOpen && <CreateGroupModal />}
            <Sidebar />

            {conversationId && conversations[conversationId] ? (
                conversations[conversationId].type === "CONTACT" ? (
                    <>
                        <CurrentChat conversation={conversations[conversationId]} />
                        <ContactInfoPanel />
                    </>
                ) : (
                    <>
                        <CurrentGroup conversation={conversations[conversationId]} />
                        <GroupInfoPanel />{" "}
                    </>
                )
            ) : (
                <FeatureList />
            )}
        </StyledDashboard>
    ) : 
    !tokenExpired ? (
        <Loader/>
    ) : (
        <Redirect to="/login" />
    );
}

export default Dashboard;
