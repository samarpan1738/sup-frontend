import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RecentChatListItem from "./RecentChatListItem";
const StyledList = styled.ul`
    // background-color: var(--background2);
    // background-color: #f3f4f6;
    height: 100%;
    width: 100%;
    color: black;
    overflow: auto;
    transition: all 0.5s ease;
`;
const List=function () {
    const conversations = useSelector((store) => store.conversations);
    // * 1. Shows recent conversations
    // * 2. Shows search results
    // console.log(`Object.keys(conversations).length : ${Object.keys(conversations).length}`);
    if(Object.keys(conversations).length === 0){
        return <div className="text-gray-600 h-1/5 w-full flex items-center justify-center">No conversations</div>
    }
    return (
        <StyledList>
            <div>
                {Object.keys(conversations).map((id) => {
                    console.log(`Rendering conversations[${id}] : `, conversations[id]);
                    return <RecentChatListItem key={id} conversation={conversations[id]} />;
                })}
            </div>
        </StyledList>
    );
}

export default List;
