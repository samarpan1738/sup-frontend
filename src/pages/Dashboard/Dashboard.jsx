import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import CurrentChatProfile from "../../components/CurrentChat/CurrentChatProfile";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { sendViaSocket, socket } from "../../store/slices/socket/socketSlice";
import FeatureList from "../../components/FeatureList/FeatureList";
import { setUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import SearchUsersModal from "../../components/SearchUsersModal/SearchUsersModal";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";

const StyledDashboard = styled.div`
    background-color: var(--background2);
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
`;

function Dashboard() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userDetails);
    const { user } = useSelector((state) => state.currentChat);
    // const {isModalOpen}=useSelector(state => state.searchUsers);
    const {search:isSearchModalOpen,createGroup:isGroupModalOpen}=useSelector(state => state.modal);
    useEffect(() => {
        if (isAuthenticated === undefined || isAuthenticated === null || isAuthenticated === false) {
            fetch("/api/user/", {
                method: "GET",
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
                    if (data.success === true) {
                        // toast({
                        //     title: data.message,
                        //     status: "success",
                        //     duration: 5000,
                        //     isClosable: true,
                        // });
                        dispatch(
                            setUserDetails({
                                isAuthenticated: true,
                                accessToken: data.data.token,
                                name: data.data.name,
                                email: data.data.email,
                                userId: data.data.id,
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
    }, [history]);
    useEffect(() => {
        if (isAuthenticated === undefined || isAuthenticated === null || isAuthenticated === false)
            history.push("/login");
    }, [isAuthenticated, history]);
    return (
        <StyledDashboard>
            {isSearchModalOpen && <SearchUsersModal/>}
            {isGroupModalOpen && <CreateGroupModal/>}
            <Sidebar />
            {user ? <CurrentChat /> : <FeatureList />}
            <CurrentChatProfile />
        </StyledDashboard>
    );
}

export default Dashboard;
