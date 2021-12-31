import React, { useState } from "react";
import classNames from "classnames";
import { persistUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;

function ChangeProfileInfo({ selectedMenuItem }) {
    console.log("Rendering ChangeProfileInfo");

    const { label, value, editable } = selectedMenuItem;
    console.log("selectedMenuItem : ", selectedMenuItem);
    const [text, setText] = useState(value);
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.userDetails);
    // const { isLoading,data,isSuccess } = useQuery("changeProfileInfo", () => {
    //     return fetch(`${urlPrefix}/api/user/${username}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             status: text,
    //         }),
    //     });
    // });
    return (
        <div className="p-4 pr-4 w-full flex flex-col">
            <div className="py-2 px-3 rounded-md focus:border-green-600 focus-within:border-green-600 border border-gray-300">
                <p className="text-gray-600" style={{ fontSize: "13px" }}>
                    {label}
                </p>
                {/* <div className="h-1"></div> */}
                <input
                    type="text"
                    disabled={!editable}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={classNames("focus:outline-none w-full", {
                        "text-black": editable,
                        "cursor-not-allowed text-gray-400": !editable,
                    })}
                />
            </div>
            <div className="h-6"></div>
            <button
                className={classNames("bg-green-500 rounded-full px-4 py-1 self-end w-max font-bold", {
                    "cursor-not-allowed opacity-60": !editable,
                })}
                disabled={!editable}
                onClick={() => dispatch(persistUserDetails({ username, status: text }))}
            >
                Save
            </button>
        </div>
    );
}

export default ChangeProfileInfo;
