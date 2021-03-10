import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../lib/util';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const me = useUser;
    const isLoggedIn = me != null;
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn == null ? (
                    'Loading'
                ) : isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default PrivateRoute;
