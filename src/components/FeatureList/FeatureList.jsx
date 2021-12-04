import React from "react";
import StyledSection from "../../globals/styledComponents/StyledSection";
import styled from "styled-components";
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
    // border-radius: 0px 10px 0px 10px;
    transition:all 200ms ease-in-out;
    &:hover
    {
        background-color:black;
        color:white;
        cursor:pointer;
    }
`;
function FeatureList() {
    return (
        <StyledSection style={styles}>
            <FeatureListItem>search for users</FeatureListItem>
            <FeatureListItem>find friends</FeatureListItem>
        </StyledSection>
    );
}

export default FeatureList;
