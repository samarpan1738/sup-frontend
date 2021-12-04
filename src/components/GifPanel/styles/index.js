import styled from "styled-components";
export const StyledGifPanel = styled.div`
    background-color: var(--background10);
    padding: 10px 14px;
    height: 250px;
`;
export const GifPreview = styled.img`
    width: 160px;
    height: 140px;
    cursor: pointer;
`;
export const GifContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    height: 200px;
    gap: 10px;
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
    background-color: #e0e5e2;
    &:focus {
        outline: none;
    }
`;