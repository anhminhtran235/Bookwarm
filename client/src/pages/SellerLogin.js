import { Form, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';

const SellerLogin = () => {
    const { form, handleChange } = useForm({
        email: 'shop@gmail.com',
        password: '123456',
    });

    const [registerSeller, { loading }] = useMutation(LOGIN_SELLER_MUTATION, {
        update(proxy, result) {
            console.log(result);
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        registerSeller({ variables: form });
    };

    return (
        <div className='mt-4'>
            <StyledForm onSubmit={onSubmit}>
                <h2>Login to your seller account</h2>

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

const LOGIN_SELLER_MUTATION = gql`
    mutation loginSeller($email: String!, $password: String!) {
        loginSeller(loginInput: { email: $email, password: $password }) {
            id
            shopName
            email
            avatar
            token
        }
    }
`;

export default SellerLogin;
