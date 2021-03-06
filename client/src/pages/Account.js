import { Form, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';
import * as alertify from '../lib/alertify';
import { UPDATE_USER_MUTATION, cacheUpdateUpdateUser } from '../lib/graphql';
import { useUser } from '../lib/util';

const Account = ({ authenticate, history }) => {
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
        onError(error) {
            alertify.error(error.graphQLErrors[0].message);
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateUser();
    };

    return (
        <div className='mt-4'>
            <StyledForm onSubmit={onSubmit}>
                <h2>Your account</h2>

                <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>User name*</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='User name'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        disabled
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridPassword'>
                    <Form.Label>Old password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Old password'
                        name='oldPassword'
                        value={form.oldPassword}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridoldPassword'>
                    <Form.Label>New oldPassword</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='New password'
                        name='newPassword'
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                </Form.Group>

                <StyledButton variant='primary' type='submit'>
                    Update profile
                </StyledButton>
            </StyledForm>
        </div>
    );
};

export default Account;
