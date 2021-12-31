import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUserDetails } from "../../store/slices/userDetails/userDetailsSlice";
import {
    StyledAuthPage,
    FormItem,
    StyledLabel,
    StyledInput,
    StyledForm,
    StyledButton,
    StyledH1,
    SignupCTA,
} from "./styles";
import { urlPrefix } from "../../utils/config";
function Login() {
    console.log("Login urlPrefix : ",urlPrefix)
    const { isAuthenticated } = useSelector((state) => state.userDetails);
    let dispatch = useDispatch();
    const toast = useToast();
    let history = useHistory();
    const loginUser = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        fetch(`${urlPrefix}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({
                username: fd.get("username"),
                password: fd.get("password"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // alert(data.message);
                if (data.success === true) {
                    toast({
                        title: data.message,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    dispatch(
                        setUserDetails({
                            isAuthenticated: true,
                            name: data.data.name,
                            email: data.data.email,
                            userId: data.data.userId,
                            profile_pic_uri: data.data.profile_pic_uri,
                            status: data.data.status,
                            username: data.data.username,
                        })
                    );
                } else {
                    toast({
                        title: data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const goToPage = (path) => {
        history.push(path);
    };
    console.log("Login component isAuthenticated : ",isAuthenticated)
    return (
        <StyledAuthPage>
            <StyledForm onSubmit={loginUser}>
                <StyledH1>login</StyledH1>
                <FormItem>
                    <StyledLabel htmlFor="username">Username</StyledLabel>
                    <StyledInput type="text" name="username" id="username" required={true} />
                </FormItem>
                <FormItem>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput type="password" name="password" id="password" required={true} />
                </FormItem>
                <SignupCTA>
                    Don't have an account? <span onClick={() => goToPage("/signup")}>Signup</span> now
                </SignupCTA>
                <StyledButton type="submit">Login</StyledButton>
            </StyledForm>
        </StyledAuthPage>
    );
}

export default Login;
