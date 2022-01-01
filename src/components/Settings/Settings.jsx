import React from "react";
import StyledSection from "../../globals/styledComponents/StyledSection";
import TopBar from "../../globals/styledComponents/TopBar";
import { ReactComponent as LeftArrow } from "../../assets/images/back-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "../../store/slices/dashboard/dashboardSlice";
import SettingsMenuItem from "./SettingsMenuItem";
import { useState } from "react";
import ChangeProfileInfo from "./ChangeProfileInfo";
import { Avatar } from "@chakra-ui/react";
const styles = {
    "--flex-grow": "2",
    "--justify-content": "space-between",
    "--flex-direction": "column",
    "--display": "flex",
    "--border-right": "none",
};
function Settings() {
    const dispatch = useDispatch();
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const { name, email, username, status, profile_pic_uri } = useSelector((state) => state.userDetails);
    return (
        <StyledSection style={styles}>
            <div className="w-full h-full flex">
                <div
                    className="flex flex-col items-center bg-white"
                    style={{
                        borderRight: "0.8px solid var(--background4)",
                        flexGrow: 4,
                    }}
                >
                    <TopBar hideAvatar={true} jc="normal">
                        <button type="button" onClick={() => dispatch(setDashboard({ isSettingsOpen: false }))}>
                            <LeftArrow fill="white" />
                        </button>
                        <div className="w-4"></div>
                        <span className="font-semibold text-lg">Settings</span>
                    </TopBar>
                    <div className="w-full">
                        <div className="px-4 py-3 text-base text-black w-full bg-gray-100 cursor-pointer flex justify-between items-center">
                            <div style={{ fontSize: "15px" }}>Your profile</div> <RightArrow fill="grey" />
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col"
                    style={{
                        flexGrow: 6,
                        maxWidth: "623px",
                    }}
                >
                    <TopBar hideAvatar={true} jc="normal">
                        {selectedMenuItem != null ? (
                            <>
                                <button type="button" onClick={() => setSelectedMenuItem(null)}>
                                    <LeftArrow fill="white" />
                                </button>
                                <div className="w-4"></div>
                                <span className="font-semibold text-lg">Change {selectedMenuItem.label}</span>
                            </>
                        ) : (
                            <span className="font-semibold text-lg">Your profile</span>
                        )}
                    </TopBar>
                    <div className="w-full">
                        {selectedMenuItem != null ? (
                            <ChangeProfileInfo selectedMenuItem={selectedMenuItem} />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Avatar
                                    src={profile_pic_uri}
                                    width="180px"
                                    height="180px"
                                    borderWidth="2px"
                                    borderColor="rgb(45, 106, 79)"
                                    marginBottom="20px"
                                    marginTop="20px"
                                />
                                <div className="h-72 w-full overflow-auto" style={{
                                    maxHeight:"calc(100vh - 300px)",
                                }}>
                                    <SettingsMenuItem
                                        setSelectedMenuItem={setSelectedMenuItem}
                                        label="Name"
                                        value={name}
                                        editable={false}
                                    />
                                    <SettingsMenuItem
                                        setSelectedMenuItem={setSelectedMenuItem}
                                        label="Username"
                                        value={"@" + username}
                                        editable={false}
                                    />
                                    <SettingsMenuItem
                                        setSelectedMenuItem={setSelectedMenuItem}
                                        label="Status"
                                        value={status}
                                        editable={true}
                                    />
                                    <SettingsMenuItem
                                        setSelectedMenuItem={setSelectedMenuItem}
                                        label="Email"
                                        value={email}
                                        editable={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </StyledSection>
    );
}

export default Settings;
