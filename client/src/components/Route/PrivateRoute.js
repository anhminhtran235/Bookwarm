import React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route, Redirect } from 'react-router-dom';

import './NProgress.css';
import { useUser } from '../../lib/util';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const me = useUser;
    const isLoggedIn = me != null;

    React.useState(nprogress.start());

    React.useEffect(() => {
        nprogress.done();
        return () => nprogress.start();
    });

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
