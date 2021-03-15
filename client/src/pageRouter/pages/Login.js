import styled from 'styled-components';

import backgroundImage from '../../assets/images/login_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';

const Login = styled(FlexRow)`
    ::before {
        content: '';
        opacity: 70%;
        position: absolute;
        background: url(${backgroundImage}) no-repeat center/cover;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;
        filter: brightness(50%);
    }
    height: 100vh;
`;

const Form = styled(FlexColumn)`
    background: white;
    padding: 30px 40px;
    margin-top: 80px;
    border-radius: 8px;
    h2 {
        font-weight: bold;
    }
    input {
        margin-top: 10px;
        font-size: 20px;
        width: 350px;
        border-radius: 5px;
        padding: 5px 15px;
        border: 1px solid var(--darker-grey);
        :focus {
            outline: none;
            border: 1px solid var(--lighter-blue);
        }
    }

    button {
        margin-top: 20px;
        background: var(--lighter-blue);
        color: white;
        padding: 5px 20px;
        width: 100%;
        border: 1px solid var(--lighter-blue);
        border-radius: 5px;
        :hover {
            background: var(--darker-blue);
        }
    }

    p {
        margin-top: 20px;
        font-size: 16px;
        a {
            color: var(--darker-blue);
        }
    }
`;

const Register = () => {
    return (
        <>
            <Navbar transparentInitially />
            <Login>
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
            </Login>
            ;
        </>
    );
};

export default Register;
