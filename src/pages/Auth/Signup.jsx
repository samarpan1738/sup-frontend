import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import AuthService from "../../services/AuthService";

function Signup() {
    const { isAuthenticated } = useSelector((state) => state.userDetails);
    const navigate = useNavigate();
    const toast = useToast();
    const loginUser = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        AuthService.createUser({
            username: fd.get("username"),
            password: fd.get("password"),
            name: fd.get("name"),
            email: fd.get("email"),
            profile_pic_uri: `https://avatars.dicebear.com/api/pixel-art/${fd.get("username")}.svg`
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
                    navigate("/login");
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
        navigate(path);
    };
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);
    return (
        <StyledAuthPage>
            <StyledForm onSubmit={loginUser}>
                <StyledH1>Sign up</StyledH1>
                <FormItem>
                    <StyledLabel htmlFor="name">Name</StyledLabel>
                    <StyledInput type="text" name="name" id="name" required={true} />
                </FormItem>
                <FormItem>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledInput type="email" name="email" id="email" required={true} />
                </FormItem>
                <FormItem>
                    <StyledLabel htmlFor="username">Username</StyledLabel>
                    <StyledInput type="text" name="username" id="username" required={true} />
                </FormItem>
                <FormItem>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput type="password" name="password" id="password" required={true} />
                </FormItem>
                <SignupCTA>
                    Already have an account? <span onClick={() => goToPage("/login")}>Login</span>
                </SignupCTA>
                <StyledButton type="submit">Signup</StyledButton>
            </StyledForm>
        </StyledAuthPage>
    );
}

export default Signup;
