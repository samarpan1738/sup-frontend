import React from "react";
import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";
import { ReactComponent as MenuIcon } from "../../assets/images/menu.svg";
import { ReactComponent as ChatIcon } from "../../assets/images/chat.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/search_topbar.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";
export const StyledTopBar = styled.div`
    display: flex;
    height: 55px;
    width: 100%;
    background-color: var(${(props) => props.bgColor});
    border-top: ${(props) => props.bt};
    padding: 8px 16px;
    align-items: center;
    justify-content: ${(props) => props.jc};
`;
export const StyledIconContainer = styled.div`
    display: flex;
    align-items: center;
    color: var(--background9);
    position: relative;
`;
export const StyledMenuIcon = styled(MenuIcon)`
    cursor: pointer;
    margin-left: 28px;
    fill: var(--background9);
`;
export const StyledChatIcon = styled(ChatIcon)`
    fill: var(--background9);
    cursor: pointer;
    margin-left: 28px;
`;
export const StyledSearchIcon = styled(SearchIcon)`
    fill: var(--background9);
    cursor: pointer;
`;
export const StyledCloseIcon = styled(CloseIcon)`
    fill: var(--background9);
    cursor: pointer;
`;
export const StyledMenu = styled.div`
    width: 180px;
    // height: 100px;
    background-color: white;
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 10;
    color: rgb(74, 74, 74);
    padding: 6px 0px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px 0px, rgba(0, 0, 0, 0.16) 0px 2px 10px 0px;
    border-radius: 2px;
    & > div {
        padding: 8px 24px;
        cursor: pointer;
        &:hover {
            background-color: rgb(226 235 231);
        }
    }
`;
export const iconMappings = {
    menu: <StyledMenuIcon />,
    chat: <StyledChatIcon />,
    search: <StyledSearchIcon />,
    close: <StyledCloseIcon />,
};
function TopBar({ children, hideAvatar = false, bgColor = "--background3", bt = "0", avatarUri ,name,jc="space-between"}) {
    return (
        <StyledTopBar bgColor={bgColor} bt={bt} jc={jc}>
            {!hideAvatar && (
                <Avatar
                    src={avatarUri}
                    width="38px"
                    height="38px"
                />
            )}
            {children}
        </StyledTopBar>
    );
}

export default TopBar;
