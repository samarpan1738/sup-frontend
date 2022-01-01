import "./App.css";
import { Dashboard, Login } from "./pages";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./pages/Auth/Signup";
import Loader from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/slices/userDetails/userDetailsSlice";
import { urlPrefix } from "./utils/config";
import axios from "axios";

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

    if (isAuthenticated === false && tokenExpired == false) {
        console.log(`isAuthenticated : ${isAuthenticated} , tokenExpired : ${tokenExpired}`);
        axios
            .get(`${urlPrefix}/api/user/`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("user data", res.data);
                if (res.data && res.data.success === true) {
                    console.log("Setting user details");
                    dispatch(
                        setUserDetails({
                            isAuthenticated: true,
                            tokenExpired: false,
                            name: res.data.data.name,
                            email: res.data.data.email,
                            userId: res.data.data.id,
                            profile_pic_uri: res.data.data.profile_pic_uri,
                            status: res.data.data.status,
                            username: res.data.data.username,
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
                dispatch(
                    setUserDetails({
                        isAuthenticated: false,
                        tokenExpired: true,
                    })
                );
            });
    }
    const isLoading = isAuthenticated === false && tokenExpired === false;
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {/* Wait if isAuthenticated === false and tokenExpired === false */}
                        {isLoading ? (
                            <Loader />
                        ) : isAuthenticated === true ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route exact path="/login">
                        {isLoading ? <Loader /> : isAuthenticated === true ? <Redirect to="/dashboard" /> : <Login />}
                    </Route>
                    <Route exact path="/signup">
                        {isAuthenticated ? <Redirect to="/dashboard" /> : <Signup />}
                    </Route>
                    <Route exact path="/dashboard">
                        <StyledApp>
                            <Dashboard />
                        </StyledApp>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
