import "./App.css";
import { Dashboard, Login } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import Signup from "./pages/Auth/Signup";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
(async () => {
    const supabase = createClient(
        "https://xnnjkkmamduwojcuaaac.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjUxOTM2NCwiZXhwIjoxOTUyMDk1MzY0fQ.iOdZ0Ab1fdAgjYSz7jnh7I1nLaPxBMlwYcMWSWtSvRg"
    );
    const { data, error } = await supabase.storage.listBuckets();
    console.log("Buckets list : ", data);
})();
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
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
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
