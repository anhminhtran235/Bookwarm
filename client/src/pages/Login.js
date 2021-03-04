import { Form, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';
import { authenticate } from '../redux/actions/auth';
import * as alertify from '../lib/alertify';

const Login = ({ history, authenticate, isLoggedIn }) => {
    const { form, handleChange } = useForm({
        email: 'minh235200@gmail.com',
        password: '123456',
    });

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        update(proxy, result) {
            alertify.success('Logged in sucessfully');
            console.log(result);
            authenticate(result.data.login);
            history.push('/shopping');
        },
        onError(error) {
            alertify.error(error.graphQLErrors[0].message);
        },
    });

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

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
            id
            username
            email
            avatar
        }
    }
`;

const mapStateToProps = (state) => ({
    isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    authenticate: (user) => dispatch(authenticate(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
