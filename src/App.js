import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RtlLayout from "./layouts/rtl";
import React from "react";
import {AuthContextProvider} from "./views/auth/AuthContext";
import {ThemeEditorProvider} from "@hypertheme-editor/chakra-ui";
import theme from "./theme/theme";
import {ChakraProvider} from "@chakra-ui/react";
import ProtectedRoute from "./views/auth/ProtectedRoute";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <ThemeEditorProvider>
                    <HashRouter>
                        <AuthContextProvider>
                            <Switch>
                                {/* Use ProtectedRoute for the /admin path */}
                                <ProtectedRoute path="/admin" component={AdminLayout} />

                                {/* Your other routes */}
                                <Route path="/auth" component={AuthLayout} />
                                <Route path="/rtl" component={RtlLayout} />
                                <Redirect from="/" to="/admin" />
                            </Switch>
                        </AuthContextProvider>
                    </HashRouter>
                </ThemeEditorProvider>
            </React.StrictMode>
        </ChakraProvider>
    )
}

export default App;