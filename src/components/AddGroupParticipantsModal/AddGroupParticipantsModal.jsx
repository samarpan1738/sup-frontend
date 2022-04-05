import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersByQuery, setQueryText } from "../../store/slices/searchUsers/searchUsersSlice";
import Modal from "../Modal/Modal";
import classNames from "classnames";
import {
    StyledModalBox,
} from "./styles";

import { debounce } from "../../utils";
import { StyledSelect } from "../CreateGroupModal/styles";
import Participant from "../CurrentGroup/Participant";
import Option from "./Option";

function AddGroupParticipantsModal({ currentConversationId }) {
    const conversations = useSelector((state) => {
        return state.conversations
    });
    console.log("conversations : ", conversations)
    const conversationIds = Object.keys(conversations);
    const userIdsInCurrentConversation = Object.keys(conversations[currentConversationId].users);
    // Pick all users who are contact and not in the current conversation
    const myContactsIds = conversationIds.filter((key) => {
        if (conversations[key].type !== "CONTACT") return false;
        const thisContactUserId = Object.keys(conversations[key].users)[0];
        const isNotInCurrentConversation = userIdsInCurrentConversation.indexOf(thisContactUserId) === -1;
        return isNotInCurrentConversation;
    });
    console.log("AddGroupParticipantsModal  myContactsIds : ", myContactsIds);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState({});
    useEffect(() => {
        const whatever = {};
        myContactsIds.forEach((contactId) => {
            console.log(conversations[contactId].users);

            const userIds = Object.keys(conversations[contactId].users);
            const userObj = conversations[contactId].users[userIds[0]];
            whatever[userObj.id] = {
                user: userObj,
                selected: false,
            };
        });

        setOptions(whatever);
    }, []);

    console.log("options : ", options);
    const selectedCount = Object.values(options).filter((option) => option.selected).length;
    return (
        <Modal target="addGroupParticipants">
            <StyledModalBox onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col mb-1">
                    <label htmlFor="group_members" className="text border-b pb-2 flex justify-between">
                        <div>Participants</div>
                        <button
                            className={classNames("bg-green-500 text-white text-sm px-3 rounded", {
                                "cursor-not-allowed opacity-60": selectedCount === 0,
                                "hover:bg-green-600": selectedCount > 0,
                            })}
                            disabled={selectedCount === 0}
                        >
                            Add {selectedCount > 0 && `(${selectedCount})`}
                        </button>
                    </label>
                    <div className="h-3"></div>
                    {/* <StyledSelect
                        onChange={handleChange}
                        name="group_members"
                        id="group_members"
                        options={options}
                        isMulti={true}
                    /> */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded px-3 py-1.5 focus-within:outline-none text-sm"
                    />
                    <div className="h-3"></div>
                    <ul className="px-1">
                        {Object.values(options).map((option, index) => {
                            const isNotLastOption = index !== Object.keys(options).length - 1;
                            return (
                                <Option
                                    name={option.user.name}
                                    profilePicUri={option.user.profile_pic_uri}
                                    status={option.user.status}
                                    bottomSpacer={isNotLastOption}
                                    bottomSpacerHeight={2.5}
                                    selected={option.selected}
                                    setOptions={setOptions}
                                    id={option.user.id}
                                />
                            );
                        })}
                    </ul>
                </div>
            </StyledModalBox>
        </Modal>
    );
}

export default AddGroupParticipantsModal;
