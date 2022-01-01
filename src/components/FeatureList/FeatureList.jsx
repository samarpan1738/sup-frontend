import React from "react";
import StyledSection from "../../globals/styledComponents/StyledSection";

import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search_topbar.svg";

export const StyledSearchIcon = styled(SearchIcon)`
    fill: var(--background5);
    cursor: pointer;
    margin:0 10px;
`;
const styles = {
    "--color": "black",
    "--flex-grow": "2",
    "--flex-direction": "column",
    "--display": "flex",
    "--justify-content": "center",
    "--ai": "center",
};
const FeatureListItem = styled.div`
    text-align: left;
    width: 240px;
    // background-color:grey;
    border-bottom: 1px solid black;
    border: 1px solid black;
    padding: 4px 14px;
    margin-bottom: 16px;
    transition: all 200ms ease-in-out;
    &:hover {
        background-color: black;
        color: white;
        cursor: pointer;
    }
`;
function FeatureList() {
    return (
        <StyledSection style={styles}>
            <div className="flex flex-col">
                <div className="text-xl flex items-center">Tap <StyledSearchIcon/> to search for friends</div>
                {/* <div className="h-2"></div>
                <div className="text-base text-gray-500">or</div>
                <div className="h-2"></div>
                <div className="text-xl">open an existing chat.</div> */}
            </div>
        </StyledSection>
    );
}

export default FeatureList;
