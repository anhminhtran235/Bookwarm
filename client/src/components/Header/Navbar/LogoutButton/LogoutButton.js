import { useMutation, useLazyQuery } from '@apollo/client';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';

import { GET_ME_QUERY, LOGOUT_MUTATION } from '../../../../lib/graphql';

const LogoutButton = ({ history }) => {
    const [refetchUser] = useLazyQuery(GET_ME_QUERY, {
        fetchPolicy: 'network-only',
    });
    const logout = async () => {
        alertify.error('Logged out');
        await removeCookie();
        await refetchUser();
        history.push('/');
    };
    const [removeCookie] = useMutation(LOGOUT_MUTATION);
    return <Button onClick={logout}>Log out</Button>;
};

export default withRouter(LogoutButton);
