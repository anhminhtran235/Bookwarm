import { Form, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';

const Login = () => {
    const { form, handleChange } = useForm({
        email: 'shop@gmail.com',
        password: '123456',
    });

    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        update(proxy, result) {
            console.log(result);
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ variables: form });
    };

    return (
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
            token
        }
    }
`;

export default Login;
