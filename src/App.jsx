import "./App.css";
import { Dashboard, Login } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./pages/Auth/Signup";
import AuthGuard from "./components/AuthGuard"
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

    // const isLoading = isAuthenticated === false && tokenExpired === false;
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthGuard authenticated={true} navigateTo="/login" />}>
                        <Route
                            path="/"
                            element={
                                <Navigate to="/dashboard" />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <StyledApp>
                                    <Dashboard />
                                </StyledApp>
                            }
                        />
                    </Route>
                    <Route element={<AuthGuard authenticated={false} navigateTo="/dashboard" />}>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
