import styled from "styled-components";
export const StyledAuthPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
`;
export const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;
export const StyledLabel = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
`;
export const StyledInput = styled.input`
    border: 1px solid black;
    padding: 4px 10px;
    font-size: 16px;
    width:100%;
`;
export const StyledForm = styled.form`
    width: 400px;
    max-width: 90vw;
`;
export const StyledButton = styled.button`
    width: 100%;
    // background-color: black;
    margin-top: 20px;
    color: white;
    padding: 6px;
    transition: all 200ms ease-in-out;
    border: 2px solid black;
    position:relative;
    overflow: hidden;
    &:hover {
        background-color: white;
        color: black;
        box-shadow: -6px 6px black;
        &::after {
            left: 100%;
        }
    }
    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        transition: all 0.5s ease-in-out;
    }
`;
export const StyledH1 = styled.h1`
    font-size: 30px;
    margin-bottom: 14px;
`;

export const SignupCTA = styled.p`
    font-size: 14px;
    color: #686262;
    & > span {
        color: var(--background3);
        text-decoration: underline;
        cursor: pointer;
    }
`;
