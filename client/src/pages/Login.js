import { Form, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { Redirect, withRouter } from 'react-router';
import alertify from 'alertifyjs';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';
import { GET_ME_QUERY, LOGIN_MUTATION } from '../lib/graphql';
import { useUser } from '../lib/util';

const Login = ({ history }) => {
    const { form, handleChange } = useForm({
        email: 'user1@gmail.com',
        password: '123456',
    });

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        refetchQueries: [{ query: GET_ME_QUERY }],
        awaitRefetchQueries: true,
        update(proxy, result) {
            alertify.success('Logged in sucessfully');
            console.log(result);
            history.push('/shopping');
        },
    });

    const me = useUser();
    const isLoggedIn = me != null;

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ variables: form });
    };

    return isLoggedIn == null ? (
        'loading'
    ) : isLoggedIn ? (
        <Redirect to='/shopping' />
    ) : (
        <div className='mt-4'>
            <StyledForm onSubmit={onSubmit}>
                <h2>Login to your account</h2>

                <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <StyledButton variant='primary' type='submit'>
                    Login
                </StyledButton>
            </StyledForm>
        </div>
    );
};

export default withRouter(Login);
