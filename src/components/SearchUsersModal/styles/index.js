import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../././../../assets/images/search.svg";

export const StyledModal = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgb(122 131 128 / 80%);
    z-index: 10;
    display: flex;
    justify-content: center;
    // align-items:center;
    padding-top: 5rem;
    color:black;
`;
export const StyledModalBox = styled.div`
    width: 100%;
    max-width: 500px;
    height: max-content;
    max-height: calc(100% - 1rem);
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: inset 1px 1px 0 0 hsla(0,0%,100%,0.5),0 3px 8px 0 #555a64;
`;
export const StyledModalInput = styled.input`
    width: 100%;
    border: 2px solid green;
    border-radius: 5px;
    padding: 0.5rem 0.75rem;
    color: black;
    font-size: 1.5rem;
    &:focus {
        outline: none;
    }
`;

export const SearchBox = styled.div`
    background-color: white;
    width: 100%;
    padding: 10px 8px;
    border: 2px solid var(--background11);
    // height: 50px;
    position: relative;
    cursor: pointer;
    color: grey;
    border-radius: 5px;
`;
export const StyledSearchIcon = styled(SearchIcon)`
    cursor: pointer;
    width: 25px;
    color: grey;
    color: var(--background11);
`;
export const StyledInput = styled.input`
    background-color: white;
    color: black;
    width: 100%;
    border-radius: 1px;
    padding: 6px 16px;
    line-height: 16px;
    // font-size: 14px;
    padding-left: 40px;
    cursor: pointer;
    font-size: 1.1rem;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: grey;
        // font-size: 14px;
        font-size: 1.1rem;
    }
`;
export const StyledLabel = styled.label`
    cursor: pointer;
    position: absolute;
    left: 12px;
    top: 13px;
`;

export const SearchStartScreen=styled.div`
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:grey;
    font-weight:light;
    font-size:0.9rem;
`