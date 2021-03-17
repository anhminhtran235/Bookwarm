import styled from 'styled-components';

import backgroundImage from '../../assets/images/register_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { Form, FormPageStyle } from '../../styles/common/FormPageStyle';

const RegisterStyle = styled(FormPageStyle)`
    background: url(${backgroundImage}) no-repeat center/cover;
`;

const Register = () => {
    return (
        <>
            <Navbar transparentInitially />
            <RegisterStyle>
                <Form>
                    <h2>Create Account</h2>
                    <input type='text' placeholder='Username' />
                    <input type='text' placeholder='Email' />
                    <input type='text' placeholder='Password' />
                    <input type='text' placeholder='Confirm password' />
                    <button>Sign up</button>
                    <p>
                        Already have an account? <a href='/login'>Login here</a>
                    </p>
                </Form>
            </RegisterStyle>
        </>
    );
};

export default Register;
