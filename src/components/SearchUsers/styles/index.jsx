import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../././../../assets/images/search.svg";
export const StyledInput = styled.input`
    background-color: var(--background2);
    color: black;
    width: 100%;
    border-radius: 1px;
    padding: 6px 16px;
    line-height: 16px;
    font-size: 14px;
    padding-left: 40px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: grey;
        font-size: 14px;
    }
`;
export const StyledInputContainer = styled.div`
    background-color: var(--background2);
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid var(--background4);
    height: 50px;
    position: relative;
    cursor: pointer;
    color: grey;
`;
export const StyledLabel = styled.label`
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 14px;
`;
export const StyledSearchIcon = styled(SearchIcon)`
    cursor: pointer;
    width: 18px;
    color: grey;
`;
