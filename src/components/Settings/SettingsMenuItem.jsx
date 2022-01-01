import React from "react";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";
function SettingsMenuItem({ label, value, setSelectedMenuItem, editable }) {
    return (
        <div
            onClick={() => editable && setSelectedMenuItem({ label, value, editable })}
            className="px-4 py-3 text-black w-full hover:bg-gray-100 cursor-pointer flex flex-row justify-between items-center"
        >
            <div>
                <div style={{ fontSize: "15px" }}>{label}</div>
                <div className="text-gray-600" style={{ fontSize: "13px" }}>
                    {value}
                </div>
            </div>
            {editable && <RightArrow fill="grey" />}
        </div>
    );
}

export default SettingsMenuItem;
