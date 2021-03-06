import { Form, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';

import useForm from '../lib/useForm';
import { toDataURL } from '../lib/util';
import { StyledForm, StyledButton } from '../lib/Form';
import { authenticate } from '../redux/actions/auth';
import * as alertify from '../lib/alertify';

const SellerRegister = ({ authenticate, history }) => {
    const { form, handleChange } = useForm({
        username: 'Test user',
        email: 'minh@gmail.com',
        password: '123456',
        avatar: '',
    });

    const [register, { loading, error }] = useMutation(
        REGISTER_SELLER_MUTATION,
        {
            update(proxy, result) {
                const user = result.data.register;
                authenticate(user);
                history.push('/shopping');
            },
        }
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        const formToSubmit = { ...form };

        if (form.avatar && form.avatar !== '') {
            try {
                toDataURL(form.avatar).then((base64Image) => {
                    formToSubmit.avatar = base64Image;
                    register({ variables: formToSubmit });
                });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            register({ variables: formToSubmit });
        }
    };

    return (
        <div className='mt-4'>
            <StyledForm onSubmit={onSubmit}>
                <h2>Join Bookworm now!</h2>

                <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='User name'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
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

                <Form.Group>
                    <Form.File
                        className='px-3'
                        id='avatar'
                        label='Avatar'
                        name='avatar'
                        onChange={handleChange}
                    />
                </Form.Group>

                <StyledButton variant='primary' type='submit'>
                    Register
                </StyledButton>
            </StyledForm>
        </div>
    );
};

const REGISTER_SELLER_MUTATION = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $avatar: String
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                avatar: $avatar
            }
        ) {
            id
            username
            email
            avatar
        }
    }
`;

const mapDispatchToProps = (dispatch) => ({
    authenticate: (user) => dispatch(authenticate(user)),
});

export default connect(null, mapDispatchToProps)(SellerRegister);
