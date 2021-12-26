import styled from "styled-components";
export const StyledGifPanel = styled.div`
    background-color: var(--background10);
    padding: 10px 14px;
    padding-bottom: 0px;
    height: 40vh;
    min-height:200px;
    max-height:450px;
    overflow: hidden;
`;
export const GifContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    height: 80%;
    gap: 10px;
    // background-color: red;
    // border:1px solid red;
`;
export const GifPreview = styled.img`
    width: 160px;
    height: 140px;
    cursor: pointer;
`;
export const GifSearchBar = styled.div`
    margin-bottom: 14px;
`;
export const GifSearchBarInput = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    padding: 16px 10px;
    border-radius: 5px;
    background-color: white;
    &:focus {
        outline: none;
    }
`;
