import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersByQuery, setQueryText } from "../../store/slices/searchUsers/searchUsersSlice";
import Modal from "../Modal/Modal";
import SearchResultItem from "../RecentChatsList/SearchResultItem";
import {
    StyledModalBox,
    StyledSearchIcon,
    StyledInput,
    SearchBox,
    StyledLabel,
    SearchStartScreen,
    ModalDropdown,
    ModalDropdownContainer,
} from "./styles";

function SearchUsersModal() {
    const dispatch = useDispatch();
    const { queryText, searchResults } = useSelector((state) => state.searchUsers);
    const conversations = useSelector((state) => state.conversations);
    const conversationIds = Object.keys(conversations);
    const { userId } = useSelector((state) => state.userDetails);

    const contacts = conversationIds.filter((key) => conversations[key].type === "CONTACT");
    const contactUserIds = contacts.map((contactId) => {
        // This is a map
        console.log(conversations[contactId].users);
        const userIds = Object.keys(conversations[contactId].users);
        const userObj =
            userIds[0] != userId
                ? conversations[contactId].users[userIds[0]]
                : conversations[contactId].users[userIds[1]];
        return userObj.id;
    });

    const handleQueryChange = (e) => {
        console.log(e.currentTarget.value);
        dispatch(setQueryText(e.currentTarget.value.trim()));
    };

    useEffect(() => {
        if (queryText && queryText.trim().length != 0) dispatch(fetchUsersByQuery(queryText));
    }, [queryText]);
    return (
        <Modal target="search">
            <StyledModalBox onClick={(e) => e.stopPropagation()}>
                <SearchBox>
                    <StyledLabel htmlFor="search-input">
                        <StyledSearchIcon />
                    </StyledLabel>
                    <StyledInput
                        placeholder="Search or start a new chat"
                        id="search-input"
                        value={queryText}
                        onChange={handleQueryChange}
                        autoComplete="off"
                    />
                </SearchBox>
                <ModalDropdown>
                    {queryText?.trim().length === 0 ? (
                        <SearchStartScreen>
                            <p>No recent searches</p>
                        </SearchStartScreen>
                    ) : searchResults.length > 0 ? (
                        <ModalDropdownContainer>
                            {searchResults.map((user) => {
                                return (
                                    <SearchResultItem
                                        key={user.id}
                                        user={user}
                                        added={contactUserIds.indexOf(user.id) !== -1}
                                    />
                                );
                            })}
                        </ModalDropdownContainer>
                    ) : (
                        <SearchStartScreen>
                            <p>No users found</p>
                        </SearchStartScreen>
                    )}
                </ModalDropdown>
            </StyledModalBox>
        </Modal>
    );
}

export default SearchUsersModal;
