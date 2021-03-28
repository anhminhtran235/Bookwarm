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
        transition: all 1s;
        transform: translateX(0px);
        :hover {
            color: white;
            text-decoration: none;
        }
    }
    h1 {
        margin: 0;
        cursor: pointer;
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
    .disable {
        @media (max-width: 720px) {
            transform: translateX(-400px);
        }
    }
    @media (max-width: 720px) {
        justify-content: ${(props) =>
            props.searchOn ? 'flex-end' : 'space-between'};
    }
`;

export const Menu = styled(FlexRow)`
    align-self: flex-end;
    justify-self: flex-end;
    .dropdown-nav {
        display: flex;
        position: absolute;
        top: 80px;
        left: 0px;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        padding-left: 0px;
        background: var(--darker-blue);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        animation-name: anim;
        animation-duration: 1s;
        @keyframes anim {
            from {
                opacity: 0%;
                height: 0px;
            }
            to {
                height: 240px;
                opacity: 100%;
            }
        }
        a {
            ::after {
                content: none;
            }
            padding: 5px;
            margin: 0px;
            width: 100%;
            text-align: center;
            :last-child {
                padding-bottom: 5px;
            }
            :hover {
                background: var(--darkest-blue);
                cursor: pointer;
            }
        }
    }
    .show-nav-bg {
        > a {
            :hover {
                ::after {
                    background: white;
                }
            }
        }
    }
`;

export const NavLinksContainer = styled.ul`
    display: flex;
    margin: 0;
    padding-left: 0;
    @media (max-width: 1195px) {
        display: none;
    }
`;

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
    margin-left: 8px;
    align-self: center;
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

export const ItemCount = styled.span`
    position: absolute;
    font-size: 12px;
    top: -12px;
    right: -6px;
    background: red;
    border-radius: 80%;
    padding: 2px 4px;
    color: white;
`;

export const BurgerWrapper = styled.div`
    transform: translateY(-3px);
    .open span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
    }

    .open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }

    display: none;
    @media (max-width: 1195px) {
        display: block;
    }
`;

export const ButtonStyle = styled.div`
    width: 30px;
    height: 22px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;

    span {
        display: block;
        position: absolute;
        height: 5px;
        width: 100%;
        background: white;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
    }

    span:nth-child(1) {
        top: 0px;
    }

    span:nth-child(2),
    span:nth-child(3) {
        top: 10px;
    }

    span:nth-child(4) {
        top: 20px;
    }
`;
