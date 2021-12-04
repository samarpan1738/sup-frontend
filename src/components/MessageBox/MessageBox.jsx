import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendViaSocket } from "../../store/slices/socket/socketSlice";
import { StyledInput, StyledInputContainer, StyledSendIcon } from "../CurrentChat/styledComponents";
function MessageBox({ conversationId, userId }) {
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const handleEnterKey = (e) => {
        if (e.code === "Enter") sendMessage();
    };
    // console.log("MessageBox re-render")
    const sendMessage = () => {
        if (msg.trim() !== "") {
            dispatch(
                sendViaSocket({
                    path: "sendToRoom",
                    data: {
                        roomId: conversationId + "",
                        sender: userId + "",
                        content: msg.trim(),
                    },
                })
            );
            setMsg("");
        }
    };
    return (
        <>
            <StyledInputContainer>
                <StyledInput
                    placeholder="Type a message"
                    value={msg}
                    onChange={(e) => setMsg(e.currentTarget.value)}
                    onKeyUp={handleEnterKey}
                />
            </StyledInputContainer>
            <button onClick={sendMessage}>
                <StyledSendIcon />
            </button>
        </>
    );
}

export default MessageBox;
