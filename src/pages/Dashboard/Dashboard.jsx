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
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userDetails);
    const { conversationId } = useSelector((state) => state.currentChat);
    const conversations = useSelector((state) => state.conversations);
    // const {isModalOpen}=useSelector(state => state.searchUsers);
    const { search: isSearchModalOpen, createGroup: isGroupModalOpen } = useSelector((state) => state.modal);
    useEffect(() => {
        if (isAuthenticated === undefined || isAuthenticated === null || isAuthenticated === false) {
            fetch(`${urlPrefix}/api/user/`, {
                method: "GET",
                credentials:"include",
            })
                .then((res) => {
                    if (res.status === 401 || res.status === 403) {
                        return history.push("/login");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    // alert(data.message);
                    if (data !== undefined && data.success === true) {
                        // toast({
                        //     title: data.message,
                        //     status: "success",
                        //     duration: 5000,
                        //     isClosable: true,
                        // });
                        dispatch(
                            setUserDetails({
                                isAuthenticated: true,
                                name: data.data.name,
                                email: data.data.email,
                                userId: data.data.id,
                                profile_pic_uri: data.data.profile_pic_uri,
                                status: data.data.status,
                            })
                        );
                    } else {
                        // toast({
                        //     title: data.message,
                        //     status: "error",
                        //     duration: 5000,
                        //     isClosable: true,
                        // });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // history.push("/login");
        }
    }, [history,dispatch,isAuthenticated]);
    useEffect(() => {
        if (isAuthenticated === undefined || isAuthenticated === null || isAuthenticated === false)
            history.push("/login");
    }, [isAuthenticated, history]);
    return (
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
    );
}

export default Dashboard;
