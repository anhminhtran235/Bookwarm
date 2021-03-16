import styled from 'styled-components';

import backgroundImage from '../../assets/images/account_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { FormPageStyle, Form } from '../../styles/common/FormPageStyle';

const AccountStyle = styled(FormPageStyle)`
    ::before {
        background: url(${backgroundImage}) no-repeat center/cover;
        filter: brightness(50%);
    }
`;

const Account = () => {
    return (
        <>
            <Navbar transparentInitially />
            <AccountStyle>
                <Form>
                    <h2>Edit Your Info</h2>
                    <input type='text' placeholder='Username' />
                    <input type='text' placeholder='Email' disabled />
                    <input type='text' placeholder='Re-enter password *' />
                    <input type='text' placeholder='New password' />
                    <button>Update info</button>
                    <p>
                        Came here by mistake?{' '}
                        <a href='/shopping'>Go back to shopping</a>
                    </p>
                </Form>
            </AccountStyle>
            ;
        </>
    );
};

export default Account;
