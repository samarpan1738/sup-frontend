import React, { useState } from "react";
import Participant from "../CurrentGroup/Participant";

function Option({
    id,
    name,
    status,
    profilePicUri,
    bottomSpacer = true,
    isAdmin = false,
    bottomSpacerHeight = 1,
    selected,
    setOptions,
}) {
    const handleChange = (e) => {
        setOptions((options) => {
            const updatedOptions = { ...options }
            // console.log("options[id] : ", options[id]);
            updatedOptions[id] = { ...updatedOptions[id] }
            updatedOptions[id].selected = !updatedOptions[id].selected;
            console.log("updatedOptions[id] : ", updatedOptions[id]);
            return updatedOptions;
        });
    };

    return (
        <div className="cursor-pointer flex items-center option">
            <input
                type="checkbox"
                name=""
                id={name}
                className="rounded-full"
                checked={selected}
                onChange={handleChange}
            />
            <div className="w-3"></div>
            <label htmlFor={name} className="w-full">
                <Participant
                    name={name}
                    profilePicUri={profilePicUri}
                    status={status}
                    bottomSpacer={bottomSpacer}
                    bottomSpacerHeight={bottomSpacerHeight}
                />
            </label>
        </div>
    );
}

export default Option;
