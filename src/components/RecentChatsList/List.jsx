import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RecentChatListItem from "./RecentChatListItem";
import SearchResultItem from "./SearchResultItem";
const StyledList = styled.ul`
    background-color: var(--background2);
    height: 100%;
    width: 100%;
    color: black;
    overflow: auto;
    transition: all 0.5s ease;
`;
const NoUserFound = styled.p`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5f6e67;
`;
function List() {
    const conversations = useSelector((store) => store.conversations);
    const { queryText, searchResults } = useSelector((state) => state.searchUsers);
    // * 1. Shows recent conversations
    // * 2. Shows search results
    return (
        <StyledList>
            <div>
                {Object.keys(conversations).map((id) => {
                    console.log(`Rendering conversations[${id}] : `, conversations[id]);
                    return <RecentChatListItem key={id} conversation={conversations[id]} />;
                })}
            </div>

            {/* {searchResults.length > 0 && (
                <div>
                    <h5
                        style={{
                            padding: "2px 12px",
                            borderBottom: "1px solid #c7c7c7",
                            marginBottom: "6px",
                            fontSize: "14px",
                            backgroundColor: "rgb(211 223 217)",
                            color: "#103424",
                        }}
                    >
                        Search Results
                    </h5>
                    {searchResults.map((user) => {
                        return <SearchResultItem key={user.id} user={user} />;
                    })}
                </div>
            )} */}
            {/* {queryText.length !== 0 && searchResults.length === 0 && <NoUserFound>No user found</NoUserFound>} */}
        </StyledList>
    );
}

export default List;
