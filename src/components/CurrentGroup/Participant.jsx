import React from "react";
import { Avatar } from "@chakra-ui/react";

function Participant({ name, status, profilePicUri, bottomSpacer=true, isAdmin = false ,bottomSpacerHeight=1}) {
    console.log(`name : ${name} , bottomSpacer : ${bottomSpacer}`);
    return (
        <>
            <div className="flex items-center relative">
                <Avatar src={profilePicUri} width="38px" height="38px" />
                <div className="px-3">
                    <p className="text-base font-semibold">{name}</p>
                    <p className="text-sm text-gray-700">{status}</p>
                </div>

                {isAdmin && (
                    <div
                        className="absolute   right-0 top-1/3 border px-2 rounded"
                        style={{
                            color: "#41916c",
                            borderColor: "#41916c",
                            fontSize:"12px"
                        }}
                        
                    >
                        Admin
                    </div>
                )}
            </div>
            {bottomSpacer && <div className={"h-"+bottomSpacerHeight}></div>}
        </>
    );
}

export default Participant;
