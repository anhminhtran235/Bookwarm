import styled from 'styled-components';

import backgroundImage from '../../assets/images/login_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { Form, FormPageStyle } from '../../styles/common/FormPageStyle';

const LoginStyle = styled(FormPageStyle)`
    ::before {
        background: url(${backgroundImage}) no-repeat center/cover;
        opacity: 70%;
        filter: brightness(50%);
    }
`;

const Login = () => {
    return (
        <>
            <Navbar transparentInitially />
            <LoginStyle>
                <Form>
                    <h2>Login</h2>
                    <input type='text' placeholder='Email' />
                    <input type='text' placeholder='Password' />
                    <button>Login</button>
                    <p>
                        New to this website?{' '}
                        <a href='/register'>Register here</a>
                    </p>
                </Form>
            </LoginStyle>
            ;
        </>
    );
};

export default Login;
