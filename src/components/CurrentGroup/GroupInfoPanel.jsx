import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopBar, { iconMappings, StyledIconContainer } from "../../globals/styledComponents/TopBar";
import { setIsProfileOpen } from "../../store/slices/currentChat/currentChatSlice";
import { Avatar } from "@chakra-ui/react";
import {
    StyledProfile,
    StyledProfileHeader,
    StyledProfileSection,
    StyledProfileAction,
    StyledDeleteIcon,
    StyledProfileActionContainer,
    StyledExitIcon,
} from "./styles";
import { ReactComponent as EditIcon } from "../../assets/images/edit.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";
import { GrAdd } from "react-icons/gr";
import classnames from "classnames";
import { setModalOpen } from "../../store/slices/modal/modalSlice";
import Participant from "./Participant";
function GroupInfoPanel({ currentChat }) {
    const dispatch = useDispatch();

    const conversations = useSelector((store) => store.conversations);
    const { userId, name, status, profile_pic_uri } = useSelector((store) => store.userDetails);
    const currentConversation = conversations[currentChat.conversationId];
    const usersCount = Object.keys(currentConversation.users).length;
    const createdByName =
        currentConversation.createdBy.id == userId
            ? "you"
            : currentConversation.users[currentConversation.createdBy.id].name;
    const closeProfile = () => {
        dispatch(setIsProfileOpen(false));
    };
    const createdAtDate = new Date(currentConversation.createdAt).toLocaleDateString();
    const createdAtTime = new Date(currentConversation.createdAt).toLocaleTimeString("en-US", {
        hour12: true,
        timeStyle: "short",
    });
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editDescriptionText, setEditDescriptionText] = useState(currentConversation.description);
    console.log("editDescriptionText : ", editDescriptionText);
    const descriptionRef = useRef(null);
    const openAddParticipantsModal = () => {
        dispatch(setModalOpen({ target: "addGroupParticipants", value: true }));
    };
    return (
        <div
            style={{
                flexGrow: "1.2",
                maxWidth: "380px",
                borderLeft: "0.8px solid var(--background4)",
                // backgroundColor: "rgb(240, 240, 240)",
            }}
            className="bg-gray-100"
        >
            <TopBar hideAvatar>
                <div
                    style={{
                        width: "100%",
                        padding: "0 16px",
                        fontWeight: "500",
                        cursor: "pointer",
                    }}
                    onClick={() => dispatch(setIsProfileOpen(true))}
                >
                    <p>Group Info</p>
                </div>
                <StyledIconContainer>
                    <button onClick={closeProfile}>{iconMappings["close"]}</button>
                </StyledIconContainer>
            </TopBar>

            <StyledProfile>
                <StyledProfileHeader className="bg-white">
                    <Avatar
                        src={currentConversation.conversationIconUrl}
                        width="180px"
                        height="180px"
                        borderWidth="2px"
                        borderColor="rgb(45, 106, 79)"
                        marginBottom="20px"
                    />
                    <div className="w-full">
                        <p className="text-2xl text-center mb-1">{currentConversation.title}</p>
                        <p className="text-sm text-center text-gray-500">Group . {usersCount + 1} participants</p>
                    </div>
                </StyledProfileHeader>
                <div className="h-3"></div>
                <StyledProfileSection className="bg-white">
                    <header
                        style={{
                            color: "#41916c",
                        }}
                        className="mb-2 text-sm"
                    >
                        {isEditingDescription ? "Edit group description" : "Group Description"}
                    </header>
                    <div className="flex items-start">
                        <p
                            className={classnames("w-full pb-1 focus-within:outline-none", {
                                "border-b-2 border-green-500": isEditingDescription,
                            })}
                            contentEditable={isEditingDescription}
                            ref={descriptionRef}
                        >
                            {editDescriptionText}
                        </p>
                        <div className="w-1"></div>
                        {!isEditingDescription && (
                            <button onClick={() => setIsEditingDescription(true)}>
                                <EditIcon fill="grey" />
                            </button>
                        )}
                    </div>
                    {isEditingDescription && (
                        <>
                            <div className="h-3"></div>
                            <div className="flex items-center justify-end text-sm">
                                <button
                                    className="bg-gray-200 rounded-2xl px-3 py-0.5"
                                    onClick={() => {
                                        setIsEditingDescription(false);
                                        descriptionRef.current.innerText = editDescriptionText;
                                    }}
                                >
                                    Cancel
                                </button>
                                <div className="w-3"></div>
                                <button
                                    className="text-white bg-green-500 rounded-2xl px-2.5 py-0.5"
                                    onClick={(e) => {
                                        console.log("Changing desc to : ", descriptionRef.current.innerText);
                                        setEditDescriptionText(descriptionRef.current.innerText);
                                        setIsEditingDescription(false);
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    )}
                    <div className="h-2"></div>
                    <p className="text-sm text-gray-500">
                        Group created by {createdByName}, on {createdAtDate} at {createdAtTime}
                    </p>
                </StyledProfileSection>
                <div className="h-3"></div>
                <div
                    style={{
                        padding: "16px 24px",
                    }}
                    className="bg-white flex flex-col"
                >
                    <header
                        style={{
                            color: "#41916c",
                        }}
                        className="mb-2 text-sm flex justify-between items-center"
                    >
                        Participants{" "}
                        <button onClick={openAddParticipantsModal}>
                            <GrAdd cursor={"pointer"} size={"16px"} />
                        </button>
                    </header>
                    <div className="h-2"></div>
                    <div className="space-y-1.5">
                        <Participant name="You" status={status} profilePicUri={profile_pic_uri} bottomSpacer={true} isAdmin={true}/>
                        {Object.keys(currentConversation.users).map((id, idx) => {
                            const user = currentConversation.users[id];
                            return (
                                <Participant
                                    name={user.name}
                                    status={user.status}
                                    profilePicUri={user.profile_pic_uri}
                                    bottomSpacer={idx !== Object.keys(currentConversation.users).length - 1}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="h-3"></div>
                <StyledProfileActionContainer className="bg-white py-2 px-2">
                    <StyledProfileAction>
                        <StyledDeleteIcon />
                        <p>Delete chat</p>
                    </StyledProfileAction>
                    <div className="h-5"></div>
                    <StyledProfileAction>
                        <StyledExitIcon />
                        <p>Exit group</p>
                    </StyledProfileAction>
                </StyledProfileActionContainer>
                <div className="h-12"></div>
            </StyledProfile>
        </div>
    );
}

export default GroupInfoPanel;
