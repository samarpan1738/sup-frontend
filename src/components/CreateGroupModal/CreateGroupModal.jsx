import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen } from "../../store/slices/modal/modalSlice";
import { StyledClosePanelIcon } from "../CurrentChat/styledComponents";
import Modal from "../Modal/Modal";
import { StyledModalBox, StyledSelect } from "./styles";

const options = [
    { value: "2", label: "Samarpan" },
    { value: "3", label: "David" },
    { value: "4", label: "John" },
];
function CreateGroupModal() {
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations);
    const { userId } = useSelector((state) => state.userDetails);
    const contacts = Object.keys(conversations).filter((key) => conversations[key].type === "CONTACT");
    const options = contacts.map((contactId) => {
        console.log(conversations[contactId].users);
        const userObj =
            conversations[contactId].users[0].user.id !== userId
                ? conversations[contactId].users[0].user
                : conversations[contactId].users[1].user;
        return {
            label: userObj.name,
            value: `${contactId}`,
        };
    });
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // const groupName = e.target.elements.groupName.value;
        // const groupMembers = e.target.elements.groupMembers.value;
        // dispatch({ type: "CREATE_GROUP", payload: { groupName, groupMembers } });
    };
    const closeModal=()=>{
        console.log("closeModal method")
        dispatch(setModalOpen({target:"createGroup",value:false}));
    }
    console.log("options : ", options);
    useEffect(() => {}, []);
    return (
        <Modal target="createGroup">
            <StyledModalBox onClick={(e) => e.stopPropagation()}>
                <div
                    style={{ marginBottom: "12px", borderBottom: "1px solid var(--background4)", padding: "0 0 10px" ,display:"flex",justifyContent:"space-between"}}
                >
                    <h1>Create Group</h1>
                    {/* <button>Close</button> */}
                    <StyledClosePanelIcon aria-label="Close create group modal" onClick={closeModal}/>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        <label htmlFor="group_name">Title</label>
                        <input
                            type="text"
                            name="group_name"
                            id="group_name"
                            style={{ border: "1px solid lightgrey", borderRadius: "4px", padding: "4px 12px" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="group_members">Participants</label>
                        <StyledSelect name="group_members" id="group_members" options={options} isMulti={true} />
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
