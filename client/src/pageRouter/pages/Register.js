import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import backgroundImage from '../../assets/images/register_background.jpg';
import { Form, FormPageStyle } from '../../styles/common/FormPageStyle';
import useForm from '../../lib/useForm';
import { useUser } from '../../lib/util';
import { REGISTER_USER_MUTATION, cacheUpdateRegister } from '../../lib/graphql';

const RegisterStyle = styled(FormPageStyle)`
    background: url(${backgroundImage}) no-repeat center/cover;
`;

const Register = ({ history }) => {
    const { form, handleChange } = useForm({
        username: 'Test user',
        email: 'minh@gmail.com',
        password: '123456',
        confirmPassword: '123456',
        avatar: '',
    });

    const [register, { loading }] = useMutation(REGISTER_USER_MUTATION, {
        update(cache, result) {
            cacheUpdateRegister(cache, result);
            alertify.success('Registered sucessfully');
            history.push('/shopping');
        },
    });

    const me = useUser();
    const isLoggedIn = me != null;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formToSubmit = { ...form };
        delete formToSubmit.confirmPassword;

        register({ variables: formToSubmit });
    };

    return isLoggedIn ? (
        <Redirect to='/shopping' />
    ) : (
        <>
            <RegisterStyle>
                <Form onSubmit={onSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Create Account</h2>
                        <input
                            type='text'
                            placeholder='Username'
                            value={form.username}
                            name='username'
                            onChange={handleChange}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            value={form.email}
                            name='email'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={form.password}
                            name='password'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Confirm password'
                            value={form.confirmPassword}
                            name='confirmPassword'
                            onChange={handleChange}
                        />
                        <button type='submit'>Sign up</button>
                        <p>
                            Already have an account?{' '}
                            <Link to='/login'>Login here</Link>
                        </p>
                    </fieldset>
                </Form>
            </RegisterStyle>
        </>
    );
};

export default withRouter(Register);
