import React, { useState } from "react";
import { Avatar, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { StyledDetailsContainer } from "./styles";
import styled from "styled-components";
import { useHistory } from "react-router";
import { addConversation } from "../../store/slices/conversations/conversationsSlice";
const SriStyledDetailsContainer = styled(StyledDetailsContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
`;
const AddButton = styled.button`
    --color: #377056;
    ${(props) => props.added && "background-color:var(--color);"}
    ${(props) => props.added && props.isHovered && "background-color:red;"}
    color: ${(props) => (props.added ? "white" : "var(--color)")};
    padding: 0px 12px;
    font-size: 14px;
    border: 1px solid var(--color);
    ${(props) => props.added && props.isHovered && "border:none;"}

    transition: all 100ms ease-in;
    &:hover {
        ${(props) => !props.added && "box-shadow: -4px 4px var(--color);"}
    }
`;

const StyledListItem = styled.div`
    padding: 0px 16px;
    padding-top: 12px;
    padding-right: 8px;
    display: flex;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgb(212, 217, 225) 0px 1px 3px 0px;
    &:hover {
        background-color: var(--background4);
    }
`;
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;
function SearchResultItem({ user, added }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const toast = useToast();
    console.log(`userId : ${user.id} , added : ${added}`);
    const [isHovered, setHovered] = useState(false);
    const handleMouseOver = (e) => {
        console.log(`handleMouseOver called ${e.currentTarget}`);
        setHovered(true);
    };
    const handleMouseOut = (e) => {
        console.log(`handleMouseOut called ${e.currentTarget}`);
        setHovered(false);
    };
    const addUser = () => {
        dispatch(addConversation({ userId: user.id, type: "CONTACT", history }));
    };
    return (
        <StyledListItem>
            <Avatar src={user.profile_pic_uri} width="38px" height="38px" />
            <SriStyledDetailsContainer>
                <div>
                    <p>
                        <span>{user.name}</span>
                    </p>

                    <i>
                        <p style={{ color: "#62786e", fontSize: "14px" }}>{user.username}</p>
                    </i>
                </div>
                <div>
                    <AddButton
                        onClick={addUser}
                        isHovered={isHovered}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        added={added}
                    >
                        {added ? (isHovered ? "remove" : "added") : "add"}
                    </AddButton>
                    {/* {added === -1 ? (
                    ) : (
                        <AddedButton onClick={addUser}>{added === -1 ? "added" : "add"}</AddedButton>
                    )} */}
                </div>
            </SriStyledDetailsContainer>
        </StyledListItem>
    );
}

export default SearchResultItem;
