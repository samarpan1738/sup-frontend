import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersByQuery, setModalOpen, setQueryText } from "../../store/slices/searchUsers/searchUsersSlice";
import {
    StyledModal,
    StyledModalBox,
    StyledSearchIcon,
    StyledInput,
    SearchBox,
    StyledLabel,
    SearchStartScreen,
} from "./styles";
// TODO: Watch the tutorial for building a modal
function SearchUsersModal() {
    const dispatch = useDispatch();
    const { queryText } = useSelector((state) => state.searchUsers);
    const handleQueryChange = (e) => {
        console.log(e.currentTarget.value);
        dispatch(setQueryText(e.currentTarget.value.trim()));
    };
    const handleClickOutside = useCallback((e) => {
        console.log("StyledModal clicked : ", e.currentTarget);
        e.stopPropagation();
        dispatch(setModalOpen(false));
        // Close search modal
    }, []);
    useEffect(() => {
        console.log("Dispatching fetchUsersByQuery");
        if (queryText && queryText.trim().length != 0) dispatch(fetchUsersByQuery(queryText));
    }, [queryText]);
    return (
        <StyledModal onClick={handleClickOutside}>
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
                <SearchStartScreen>
                    <p>No recent searches</p>
                </SearchStartScreen>
            </StyledModalBox>
        </StyledModal>
    );
}

export default SearchUsersModal;
