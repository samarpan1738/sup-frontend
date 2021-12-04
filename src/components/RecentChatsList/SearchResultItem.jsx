import React from "react";
import { Avatar, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../store/slices/currentChat/currentChatSlice";
import { StyledDetailsContainer, StyledListItem } from "./styles";
import styled from "styled-components";
import { useHistory } from "react-router";
const SRI_StyledDetailsContainer = styled(StyledDetailsContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const AddButton = styled.button`
    --color: #377056;
    ${(props) => props.added && "background-color:var(--color);"}
    color: ${(props) => (props.added ? "white" : "var(--color)")};
    padding: 0px 12px;
    font-size: 14px;
    border: 1px solid var(--color);
    transition: all 100ms ease-in;
    &:hover {
        ${(props) => !props.added && "box-shadow: -4px 4px var(--color);"}
    }
`;

function SearchResultItem({ user }) {
    const history=useHistory();
    const userDetails = useSelector((state) => state.userDetails);
    const toast = useToast();
    const addUser = () => {
        fetch("/api/conversations/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userDetails.accessToken}`,
            },
            body: JSON.stringify({
                uid: user.id,
            }),
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    return history.push("/login");
                }
                return res.json();
            })
            .then((data) => {
                console.log("data : ", data);
                if (data.success) {
                    toast({
                        title: data.message,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: data.message,
                        position: "top-right",
                        status: "info",
                        variant: "left-accent",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <StyledListItem>
            <Avatar src={user.profile_pic_uri} width="38px" height="38px" />
            <SRI_StyledDetailsContainer>
                <div>
                    <p>
                        <span>{user.name}</span>
                    </p>

                    <i>
                        <p style={{ color: "#62786e", fontSize: "14px" }}>{user.username}</p>
                    </i>
                </div>
                <div>
                    <AddButton onClick={addUser}>add</AddButton>
                </div>
            </SRI_StyledDetailsContainer>
        </StyledListItem>
    );
}

export default SearchResultItem;
