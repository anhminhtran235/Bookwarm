import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';

import backgroundImage from '../../assets/images/account_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { FormPageStyle, Form } from '../../styles/common/FormPageStyle';
import useForm from '../../lib/useForm';
import { UPDATE_USER_MUTATION, cacheUpdateUpdateUser } from '../../lib/graphql';
import { useUser } from '../../lib/util';
import { Link } from 'react-router-dom';

const AccountStyle = styled(FormPageStyle)`
    background: url(${backgroundImage}) no-repeat center/cover;
`;

const Account = () => {
    const me = useUser();

    const { form, handleChange } = useForm(
        me
            ? {
                  username: me.username,
                  email: me.email,
                  oldPassword: '',
                  newPassword: '',
              }
            : {
                  username: '',
                  email: '',
                  oldPassword: '',
                  newPassword: '',
              }
    );

    const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
        variables: {
            username: form.username,
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
        },
        update(cache, result) {
            alertify.success('Update profile successully');
            cacheUpdateUpdateUser(cache, result);
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateUser();
    };
    return (
        <>
            <AccountStyle>
                <Form onSubmit={onSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Edit Your Info</h2>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='text'
                            placeholder='Email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            disabled
                        />
                        <input
                            type='password'
                            placeholder='Re-enter password *'
                            name='oldPassword'
                            value={form.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            placeholder='New password'
                            name='newPassword'
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                        <button type='submit'>Update info</button>
                        <p>
                            Came here by mistake?{' '}
                            <Link to='/shopping'>Go back to shopping</Link>
                        </p>
                    </fieldset>
                </Form>
            </AccountStyle>
        </>
    );
};

export default Account;
