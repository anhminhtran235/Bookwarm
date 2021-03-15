import styled from 'styled-components';

import backgroundImage from '../../assets/images/account_background.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';

const AccountStyle = styled(FlexRow)`
    ::before {
        content: '';
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
