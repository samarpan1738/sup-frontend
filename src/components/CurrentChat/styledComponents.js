import styled from "styled-components";
import { ReactComponent as SendIcon } from "../../assets/images/send.svg";
import { ReactComponent as AttachmentIcon } from "../../assets/images/attach-file.svg";
import { ReactComponent as BlockIcon } from "../../assets/images/block.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import { ReactComponent as ReportIcon } from "../../assets/images/thumbs-down.svg";
import TopBar from "../../globals/styledComponents/TopBar";
import { ReactComponent as EmojiIcon } from "../../assets/images/emoji.svg";
import { ReactComponent as ClosePanelIcon } from "../../assets/images/close-panel.svg";
export const StyledSendIcon = styled(SendIcon)`
    fill: var(--background3);
    cursor: pointer;
`;
export const StyledAttachmentIcon = styled(AttachmentIcon)`
    fill: var(--background3);
    cursor: pointer;
`;

export const StyledEmojiIcon = styled(EmojiIcon)`
    fill: var(--background3);
    cursor: pointer;
    width: 30px;
    height: 30px;
`;
export const StyledClosePanelIcon = styled(ClosePanelIcon)`
    // fill: var(--background3);
    fill: rgb(81, 88, 92);
    cursor: pointer;
`;
export const StyledMessageBox = styled.div`
    background-color: var(--background4);
    width: max-content;
    min-width:100px;
    max-width: 47%;
    // padding: 6px 16px;
    padding: 6px 10px 10px;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    color: black;
    position:relative;
    gap: 5px;
   
    & > span + span {
        margin-left: 14px;
        font-size: 12px;
        letter-spacing: 1px;
    }
    & > span {
    }
    & > div + div {
        // margin-left: 14px;
        font-size: 12px;
        letter-spacing: 1px;
        width: 80px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    & .StyledMessageBox_text {
        padding:0 6px;
    }
    & .StyledMessageBox_timestamp {
        // border-top: 1px solid rgb(177 174 174);
        font-size: 11px;
        text-align: right;
        width: 100%;
        position:absolute;
        bottom:4px;
        right:8px;
    }

    & .StyledMessageBox_spacer
    {
        width:60px;
    }

    & .text-message
    {
        display:flex;
    }
`;


export const StyledGifBox = styled(StyledMessageBox)`
    padding: 6px 6px;
    & .StyledMessageBox_timestamp {
        bottom:12px;
        right:14px;
    }
    border-radius:10px !important;
    & .StyledMessageBox_img {
        border-radius:10px;
    }
`
export const StyledMessagesList = styled.ul`
    flex: 1;
    padding: 14px 0px;
    overflow: auto;
    color: black;
    scroll-behavior: smooth;
`;
export const StyledMessagesListItem = styled.li`
    margin-bottom: 12px;
    display: flex;
    padding: 0 54px;
    justify-content: ${(props) => {
        if (props.type === "received") return "flex-start";
        if (props.type === "sent") return "flex-end";
        if (props.type === "timeline") return "center";
    }};
    ${StyledMessageBox} {
        border-radius: ${(props) => {
            if (props.type === "received") return "10px 10px 10px 0";
            if (props.type === "sent") return "10px 10px 0 10px";
            if (props.type === "timeline") return "10px";
        }};
    }
`;
export const StyledTimeline = styled.div`
    padding: 4px 10px;
    display: flex;
    align-items: center;
    font-size: 13px;
    background-color: var(--background1);
    border-radius: 10px;
    margin: 10px 0;
`;
export const BottomBar = styled(TopBar)``;
export const IconContainer = styled.div`
    display: flex;
    & > button + button {
        margin-left: 16px;
    }
`;
export const StyledInput = styled.input`
    background-color: var(--background2);
    width: 100%;
    color: black;
    border-radius: 100px;
    padding: 10px 24px;
    line-height: 16px;
    font-size: 16px;
    // padding-left: 40px;
    cursor: cursor;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: grey;
        font-size: 14px;
    }
`;
export const StyledInputContainer = styled.div`
    // background-color: var(--background2);
    width: 100%;
    padding: 10px;
    height: 60px;
    cursor: pointer;
`;
export const StyledProfile = styled.div`
    overflow: auto;
    height: calc(100% - 55px);
    border-bottom: 1px solid var(--background3);
    color: black;
`;
export const StyledProfileSeperator = styled.div`
    height: 10px;
    width: 100%;
    background-color: var(--background1);
`;
export const StyledProfileSection = styled.div`
    padding: 16px 24px;
    font-size: 16px;
    color: #313a37;
    & > header {
        color: #41916c;
        margin-bottom: 20px;
        font-size: 14px;
    }
    & > .current_chat_status {
        border-bottom: 1px solid #b3c3bb;
        padding-bottom: 8px;
        margin-bottom: 8px;
    }
    & > .current_chat_username {
    }
`;
export const StyledProfileHeader = styled(StyledProfileSection)`
    align-items: center;
    display: flex;
    flex-direction: column;
`;
export const StyledBlockIcon = styled(BlockIcon)`
    fill: rgb(239, 105, 122);
    width: 22px;
    height: 22px;
    margin-right: 20px;
`;
export const StyledDeleteIcon = styled(DeleteIcon)`
    fill: rgb(239, 105, 122);
    width: 22px;
    height: 22px;
    margin-right: 20px;
`;
export const StyledReportIcon = styled(ReportIcon)`
    fill: rgb(239, 105, 122);
    width: 22px;
    height: 22px;
    margin-right: 20px;
    font-size: 18px;
`;
export const StyledProfileActionContainer = styled.div`
    margin-top: 20px;
`;
export const StyledProfileAction = styled.div`
    cursor: pointer;
    color: rgb(239, 105, 122);
    display: flex;
    background-color: rgb(220, 220, 220);
    padding: 10px 20px;
    border-radius: 10px;
    align-items: center;
    margin: 0 10px;
    margin-bottom: 16px;
    & > p {
        font-weight: 600;
    }
    &:hover {
        background-color: rgb(210, 210, 210);
        box-shadow: 0px 0px 2px rgb(200, 200, 200);
    }
`;
export const DaySeperator = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    position: sticky;
    // background-color: rgba(0,0,0,0.02);
    // padding:5px 0;
    top: 0px;
    & > p {
        color: black;
        font-size: 12px;
        text-align: center;
        border: 1px solid #b8c5bd;
        border-radius: 16px;
        padding: 4px 18px;
        font-weight: 700;
        width: max-content;
    }
`;
export const Line = styled.div`
    flex: 2;
    width: 100%;
    height: 1px;
    background-color: #b8c5bd;
`;
export const StyledDateLabel = styled.p`
    color: black;
    font-size: 12px;
    text-align: center;
    border: 1px solid #b8c5bd;
    border-radius: 16px;
    padding: 4px 18px;
    font-weight: 700;
    width: max-content;
    position: sticky;
    top: 0px;
    left: 50%;
    // transform:translateY(10px);
    transform: translateX(-50%);
    background-color: #e6e6e6;
`;

export const StyledMessageGroup = styled.div`
    &::before {
        content: "";
        display: block;
        position: relative;
        width: 100%;
        height: 1px;
        background-color: #b8c5bd;
        top: 14px;
    }
`;
export const StyledUnreadLabel = styled.div`
    display: flex;
    justify-content: center;
    background-color: grey;
`;
export const NoMessagesLabel = styled.div`
    color: black;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: grey;
    padding-top: 50px;
`;
