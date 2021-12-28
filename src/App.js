import "./App.css";
import { Dashboard, Login } from "./pages";
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";

import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./pages/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserDetails } from "./store/slices/userDetails/userDetailsSlice";

const StyledApp = styled.div`
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;
const urlPrefix =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_TEST_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;
function App() {
    const { isAuthenticated } = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    console.log("App component isAuthenticated : ", isAuthenticated);
    
    if (isAuthenticated === false) {
        fetch(`${urlPrefix}/api/user/`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
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
                            name: data.data.name,
                            email: data.data.email,
                            userId: data.data.id,
                            profile_pic_uri: data.data.profile_pic_uri,
                            status: data.data.status,
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
                    </Route>
                    <Route exact path="/login">
                        {isAuthenticated ?  <Redirect to="/dashboard" /> : <Login />}
                    </Route>
                    <Route exact path="/signup">
                        {isAuthenticated ?  <Redirect to="/dashboard" /> : <Signup />}
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
