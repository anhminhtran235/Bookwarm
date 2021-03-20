import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router';

import { LOGOUT_MUTATION, cacheUpdateLogout } from '../../../lib/graphql';
import { NavLink } from '../../../styles/HeaderStyle';

const LogoutButton = ({ history }) => {
    const [removeCookie] = useMutation(LOGOUT_MUTATION, {
        update(cache, result) {
            alertify.error('Logged out');
            cacheUpdateLogout(cache, result);
        },
    });

    const logout = async () => {
        await removeCookie();
        history.push('/');
    };
    return <NavLink onClick={logout}>Logout</NavLink>;
};

export default withRouter(LogoutButton);
