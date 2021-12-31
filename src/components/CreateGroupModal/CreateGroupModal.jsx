import { useToast } from "@chakra-ui/react";
import React, {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setModalOpen } from "../../store/slices/modal/modalSlice";
import { StyledClosePanelIcon } from "../CurrentChat/styledComponents";
import Modal from "../Modal/Modal";
import { StyledModalBox, StyledSelect } from "./styles";
import { urlPrefix } from "../../utils/config";

function CreateGroupModal() {
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations);
    const { userId } = useSelector((state) => state.userDetails);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const contacts = Object.keys(conversations).filter((key) => conversations[key].type === "CONTACT");
    const options = contacts.map((contactId) => {
        console.log(conversations[contactId].users);
        const userIds = Object.keys(conversations[contactId].users);
        const userObj =
            userIds[0] != userId
                ? conversations[contactId].users[userIds[0]]
                : conversations[contactId].users[userIds[1]];
        return {
            label: userObj.name,
            value: `${userObj.id}`,
        };
    });
    const toast = useToast();
    const history = useHistory();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        console.log(
            `fd.get("group_name") : ${fd.get("group_name")} , fd.get("group_members") : ${fd.get("group_members")}`
        );
        const title = fd.get("group_name");
        const description = fd.get("group_description");
        const users = selectedOptions.map(({ value }) => {
            return value;
        });
        fetch(`${urlPrefix}/api/conversations/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({
                type: "GROUP",
                users,
                title,
                description,
            }),
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    return history.push("/login");
                }
                return res.json();
            })
            .then((data) => {
                console.log("data : ", data);
                if (data.success) {
                    toast({
                        title: data.message,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: data.message,
                        position: "top-right",
                        status: "info",
                        variant: "left-accent",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // const groupName = e.target.elements.groupName.value;
        // const groupMembers = e.target.elements.groupMembers.value;
        // dispatch({ type: "CREATE_GROUP", payload: { groupName, groupMembers } });
    };
    const closeModal = () => {
        console.log("closeModal method");
        dispatch(setModalOpen({ target: "createGroup", value: false }));
    };
    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    // console.log("options : ", options);
    useEffect(() => {}, []);
    return (
        <Modal target="createGroup">
            <StyledModalBox onClick={(e) => e.stopPropagation()}>
                <div
                    style={{
                        marginBottom: "12px",
                        borderBottom: "1px solid var(--background4)",
                        padding: "0 0 10px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h1>Create Group</h1>
                    {/* <button>Close</button> */}
                    <StyledClosePanelIcon aria-label="Close create group modal" onClick={closeModal} />
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="group_name" className="text-sm mb-1 px-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="group_name"
                            id="group_name"
                            style={{ border: "1px solid lightgrey", borderRadius: "4px" }}
                            className="px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="group_name" className="text-sm mb-1 px-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="group_description"
                            id="group_description"
                            style={{ border: "1px solid lightgrey", borderRadius: "4px" }}
                            className="px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col mb-1">
                        <label htmlFor="group_members" className="text-sm mb-1">
                            Participants
                        </label>
                        <StyledSelect
                            onChange={handleChange}
                            name="group_members"
                            id="group_members"
                            options={options}
                            isMulti={true}
                        />
                    </div>
                    <button
                        style={{
                            marginTop: "24px",
                            backgroundColor: "var(--background5)",
                            color: "white",
                            width: "100%",
                            padding: "4px 12px",
                        }}
                    >
                        Create
                    </button>
                </form>
            </StyledModalBox>
        </Modal>
    );
}

export default CreateGroupModal;
