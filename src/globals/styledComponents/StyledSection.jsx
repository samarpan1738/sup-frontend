import React from "react";
import styled from "styled-components";

const StyledSection = styled.div`
    display: var(--display);
    flex: var(--flex-grow);
    max-width: var(--max-width);
    border-right: var(--border-right);
    border-left: var(--border-left);
    overflow: hidden;
    flex-direction:var(--flex-direction);
    justify-content:var(--justify-content);
    align-items:var(--ai);
    color:var(--color);
`;
function Section({ children, style, icons }) {
    return (
        <StyledSection style={style}>
            {children}
        </StyledSection>
    );
}
export default Section;
