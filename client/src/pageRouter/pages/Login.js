import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Redirect, withRouter } from 'react-router';
import alertify from 'alertifyjs';

import backgroundImage from '../../assets/images/login_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { Form, FormPageStyle } from '../../styles/common/FormPageStyle';
import useForm from '../../lib/useForm';
import { cacheUpdateLogin, LOGIN_MUTATION } from '../../lib/graphql';
import { useUser } from '../../lib/util';

const LoginStyle = styled(FormPageStyle)`
    background: url(${backgroundImage}) no-repeat center/cover;
`;

const Login = ({ history }) => {
    const { form, handleChange } = useForm({
        email: 'user1@gmail.com',
        password: '123456',
    });

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        update(cache, result) {
            cacheUpdateLogin(cache, result);
            alertify.success('Logged in sucessfully');
            history.push('/shopping');
        },
    });

    const me = useUser();
    const isLoggedIn = me != null;

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ variables: form });
    };

    return isLoggedIn ? (
        <Redirect to='/shopping' />
    ) : (
        <>
            <Navbar transparentInitially />
            <LoginStyle>
                <Form>
                    <h2>Login</h2>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button onClick={onSubmit}>Login</button>
                    <p>
                        New to this website?{' '}
                        <Link to='/register'>Register here</Link>
                    </p>
                </Form>
            </LoginStyle>
        </>
    );
};

export default withRouter(Login);
