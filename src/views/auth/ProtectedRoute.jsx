import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the path accordingly

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/auth/sign-in" />
                )
            }
        />
    );
};

export default ProtectedRoute;
