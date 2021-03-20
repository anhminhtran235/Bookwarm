import { useMutation, useLazyQuery } from '@apollo/client';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router';

import { LOGOUT_MUTATION, cacheUpdateLogout } from '../../../lib/graphql';
import { NavLink } from '../../../styles/HeaderStyle';

const LogoutButton = ({ history }) => {
    const [removeCookie] = useMutation(LOGOUT_MUTATION, {
        update(cache, result) {
            cacheUpdateLogout(cache, result);
        },
    });

    const logout = async () => {
        alertify.error('Logged out');
        await removeCookie();
        history.push('/');
    };
    return <NavLink onClick={logout}>Logout</NavLink>;
};

export default withRouter(LogoutButton);
