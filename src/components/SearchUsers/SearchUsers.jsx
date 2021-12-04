import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByQuery, setQueryText } from "../../store/slices/searchUsers/searchUsersSlice";
import {
    StyledInput,
    StyledInputContainer,
    StyledSearchIcon,
    StyledLabel,
} from "./styles";

function SearchUsers() {
    const dispatch = useDispatch();
    const {queryText} = useSelector(state => state.searchUsers)
    const handleQueryChange = (e) => {
        console.log(e.currentTarget.value)
        dispatch(setQueryText(e.currentTarget.value.trim()));
    };
    useEffect(() => {
        console.log("Dispatching fetchUsersByQuery")
        if (queryText && queryText.trim().length != 0)
            dispatch(fetchUsersByQuery(queryText));
    }, [queryText]);
    
    return (
        <StyledInputContainer>
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
        </StyledInputContainer>
    );
}

export default SearchUsers;
