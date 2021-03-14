import { BrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header/Header';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto');
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

    html {
        --light-blue: #24b6c8;
        --lighter-grey: #f4f7f9;
        --darker-grey: #dbdbdb;
        --lighter-black: #2d3e50;
        --darker-black: #222222;
        --container-padding: 120px;

        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        font-family: 'Montserrat';
        padding: 0;
        margin: 0;
        font-size: 20px;
    }

    ul {
        text-decoration: none;
        list-style: none;
    }

    a {
        text-decoration: none;
        color: var(---darker-black);
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        font-family: 'Montserrat';
    }

    .special-text {
        font-family: 'Dancing Script', cursive
    }
`;

const Container = styled.div`
    padding: 2rem;
    max-width: var(--maxWidth);
    margin: 0 auto;
`;

const Page = ({ children }) => {
    return (
        <>
            <BrowserRouter>
                <GlobalStyles />
                {/* <Header></Header> */}
                {children}
            </BrowserRouter>
        </>
    );
};

export default Page;
