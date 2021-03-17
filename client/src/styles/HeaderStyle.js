import styled from 'styled-components';

import { FlexColumn, FlexRow } from './common/UtilStyle';
import featureImg from '../assets/images/feature.jpg';

export const HeaderStyle = styled(FlexRow)`
    background: url(${featureImg}) no-repeat center center/cover;
    height: 700px;
    color: white;
    margin: 0;
    text-align: center;
    padding: 0px var(--container-padding);
`;

export const Outer = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    color: white;
    background: ${(props) =>
        props.showNavBg ? 'var(--lighter-blue)' : 'none'};
    width: 100%;
    transition: 0.5s ease-out;
`;

export const Container = styled.div`
    margin: 0 auto;
    padding: 1rem;
    margin: 0px var(--container-padding);
    position: relative;
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    .logo {
        font-size: 40px;
        line-height: 1.2;
        display: block;
        :hover {
            color: white;
            text-decoration: none;
        }
    }
    ul,
    h1 {
        margin: 0;
        cursor: pointer;
    }
    ul {
        display: flex;
        li {
            margin-left: 8px;
            align-self: center;
        }
    }
    ::after {
        content: ${(props) => (props.showNavBg ? 'none' : "''")};
        display: block;
        width: 100%;
        height: 0.4rem;
        position: absolute;
        left: 0;
        right: 0;
        background-color: white;
        top: 4.5rem;
        border-radius: 5px;
    }
`;

export const Menu = styled(FlexRow)``;

export const Content = styled(FlexColumn)`
    h1 {
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 30px;
        font-size: 18px;
        max-width: 500px;
        text-align: center;
    }
    transform: translateY(-80px);
`;

export const NavLink = styled.a`
    position: relative;
    ::after {
        content: '';
        display: block;
        position: absolute;
        transition: all 0.3s;
        width: 0%;
        top: 30px;
        left: 50%;
        right: 50%;
        height: 2px;
    }
    :hover {
        cursor: pointer;
        color: white;
        text-decoration: none;
        ::after {
            background: ${(props) =>
                props.showNavBg ? 'white' : 'var(--lighter-blue)'};
            width: 100%;
            left: 0%;
            right: 0%;
        }
    }
`;

export const Button = styled.div`
    background: white;
    color: #e05100;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    :hover {
        cursor: pointer;
        background: var(--lighter-grey);
    }
`;
