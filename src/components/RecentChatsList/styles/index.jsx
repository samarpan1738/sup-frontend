import styled from "styled-components";
export const StyledDetailsContainer = styled.div`
    margin-left: 12px;
    padding-bottom: 12px;
    border-bottom: ${(props) => (props.noBottomBorder ? "none" : "1px solid #b3c3bb")};
    width: 85%;
    position: relative;
    & > p {
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin-bottom:2px;
        & > span + span {
            font-weight: 200;
            font-size: 12px;
            padding: 0 0px;
        }
    }
    & > p + p {
        // font-size: 14px;
        // font-weight: normal;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;

        // width: 314px;
    }
    & > .conversation_last_message {
        color: #5e5b5b;
        font-size: 14px;
        font-weight: normal;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
`;

export const StyledListItem = styled.div`
    ${(props) =>
        props.noPadding
            ? ""
            : `
        padding-bottom: 0px;
        padding-top: 12px;
        padding-right: 8px;
        padding-left: 16px;
    `}
    display: flex;
    cursor: ${({ cursor }) => (cursor ? cursor : "pointer")};
    ${(props) => (props.selectedChat == false ? "" : "border-right: 4px solid rgb(88 181 138);")}
    &:hover {
        ${(props) => (props.noHoverEffects ? "" : "background-color: var(--background4);")}
    }
`;

export const StyledUnreadCounter = styled.div`
    position: absolute;
    top: 22px;
    right: 0px;
    font-weight: bold;
    background-color: rgb(80 191 139);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
`;
