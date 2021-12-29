import React from "react";
import { Spinner } from "@chakra-ui/react";

function Loader() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-black text-white">
            <div className="flex justify-center items-center">
                <div className="text-2xl">Loading</div> <div className="w-4"></div>
                <Spinner color="green.300" emptyColor="gray.200" thickness="4px" speed="0.65s" size='lg'/>
            </div>
        </div>
    );
}

export default Loader;
