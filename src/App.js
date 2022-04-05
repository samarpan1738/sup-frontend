import "./App.css";
import { Dashboard, Login } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./pages/Auth/Signup";
import Loader from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/slices/userDetails/userDetailsSlice";
import { useState } from "react";
import UserService from "./services/UserService";

const StyledApp = styled.div`
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

function App() {
    const { isAuthenticated, tokenExpired } = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    if (isAuthenticated === false && tokenExpired == false) {
        console.log(`isAuthenticated : ${isAuthenticated} , tokenExpired : ${tokenExpired}`);
        UserService.getLoggedInUserDetails()
            .then((res) => res.json())
            .then((data) => {
                console.log("user data", data);
                setIsLoading(false);
                if (data && data.success === true) {
                    console.log("Setting user details");
                    dispatch(
                        setUserDetails({
                            isAuthenticated: true,
                            tokenExpired: false,
                            name: data.data.name,
                            email: data.data.email,
                            userId: data.data.id,
                            profile_pic_uri: data.data.profile_pic_uri,
                            status: data.data.status,
                            username: data.data.username,
                        })
                    );
                } else {
                    dispatch(
                        setUserDetails({
                            isAuthenticated: false,
                            tokenExpired: true,
                        })
                    );
                }
            })
            .catch((err) => {
                console.log("err", err);
                setIsLoading(false);
                dispatch(
                    setUserDetails({
                        isAuthenticated: false,
                        tokenExpired: true,
                    })
                );
            });
    }
    // const isLoading = isAuthenticated === false && tokenExpired === false;
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoading ? <Loader /> : isAuthenticated === true ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/login"
                        element={isLoading ? <Loader /> : isAuthenticated === true ? <Navigate to="/dashboard" /> : <Login />}
                    />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
                    <Route
                        path="/dashboard"
                        element={
                            <StyledApp>
                                <Dashboard />
                            </StyledApp>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
