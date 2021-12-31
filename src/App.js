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
        fetch(`${urlPrefix}/api/user/`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    console.log("401 or 403");
                    dispatch(
                        setUserDetails({
                            isAuthenticated: false,
                            tokenExpired: true,
                        })
                    );
                    return;
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data !== undefined && data.success === true) {
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
                    setUserDetails({
                        isAuthenticated: false,
                        tokenExpired: true,
                    });
                }
            })
            .catch((err) => {
                setUserDetails({
                    isAuthenticated: false,
                    tokenExpired: true,
                });
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
