import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Book from '../../component/Book/Book';
import FeaturedBook from '../../component/Book/FeaturedBook';
import { FlexRow, FlexColumn } from '../../styles/common/UtilStyle';
import { PopularBooks, OurLibrary, Footer } from '../../styles/HomeStyle';
import featureImg from '../../assets/images/feature.jpg';
import bookIcon from '../../assets/icons/icons8-open-book.png';

const Header = styled.header`
    background: url(${featureImg}) no-repeat center center/cover;
    height: 700px;
    color: white;
    margin: 0;
`;

const Outer = styled.div`
    background: ${(props) => (props.showNavBg ? 'var(--light-blue)' : 'none')};
    width: 100%;
    transition: 0.5s ease-out;
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 1rem;
    margin: 0px var(--container-padding);
    position: relative;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
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

const Content = styled(FlexColumn)`
    padding-top: 150px;
    h1 {
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 30px;
        font-size: 18px;
        max-width: 500px;
        text-align: center;
    }
`;

const NavLink = styled.a`
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
                props.showNavBg ? 'white' : 'var(--light-blue)'};
            width: 100%;
            left: 0%;
            right: 0%;
        }
    }
`;

const Button = styled.div`
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

const Section = styled(FlexRow)`
    padding: 40px var(--container-padding);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
`;

const InnerSection = styled(FlexColumn)`
    p {
        text-align: center;
    }
    img {
        color: white;
        padding: 20px;
        border-radius: 50%;
    }
`;

const Home = () => {
    const [navState, setNavState] = useState({
        showNavBg: false,
        navStyle: {
            position: 'relative',
        },
        divStyle: {
            width: '100%',
            height: '0px',
        },
    });

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            if (window.pageYOffset > 80) {
                setNavState({
                    showNavBg: true,
                    navStyle: {
                        position: 'fixed',
                        top: '0px',
                    },
                    divStyle: {
                        width: '100%',
                        height: '80px',
                    },
                });
            } else {
                setNavState({
                    showNavBg: false,
                    navStyle: {
                        position: 'relative',
                    },
                    divStyle: {
                        width: '100%',
                        height: '0px',
                    },
                });
            }
        });
    }, []);

    return (
        <>
            <Header>
                <div style={navState.divStyle}></div>
                <Outer showNavBg={navState.showNavBg} style={navState.navStyle}>
                    <Container>
                        <Nav showNavBg={navState.showNavBg}>
                            <h1 className='special-text'>Bookworm</h1>
                            <ul>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        Shop
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        Sell
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        Order
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        Account
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        My Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink showNavBg={navState.showNavBg}>
                                        Logout
                                    </NavLink>
                                </li>
                                {/* <NavLink>Login</NavLink>
                        <NavLink>Register</NavLink> */}
                            </ul>
                        </Nav>
                    </Container>
                </Outer>
                <Content>
                    <h1 className='special-text'>
                        Creative and Tech Training Library
                    </h1>
                    <p>
                        Learn to create stunning movies, games, projects and
                        more with professional video tutorials
                    </p>
                    <Button>Start Reading Now</Button>
                </Content>
            </Header>

            <Section>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
            </Section>

            <PopularBooks>
                <h3>Popular Books</h3>
                <FlexRow>
                    <Book
                        image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        title='Big Magic'
                        author='Elizabeth Gilbert'
                        price='22.59'
                    />
                    <Book
                        image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        title='Big Magic'
                        author='Elizabeth Gilbert'
                        price='22.59'
                    />
                    <Book
                        image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        title='Big Magic'
                        author='Elizabeth Gilbert'
                        price='22.59'
                    />
                    <Book
                        image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        title='Big Magic'
                        author='Elizabeth Gilbert'
                        price='22.59'
                    />
                </FlexRow>
            </PopularBooks>

            <FeaturedBook
                title='The Complete Idiots Guide to Graphic Design'
                description='From advanced selectors to generated content to web
                fonts, and from gradients, shadows, and rounded corners
                to elegant animations, CSS3 hold a universe of creative
                possibilities. No one can better guide you through these
                galaxies than Dan Cederholm'
                author='Anggi Krisna'
                image1='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                image2='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
            />

            <OurLibrary>
                <h1>Browse Through Our Complete Library</h1>
                <p>Browse Collection &rarr;</p>
            </OurLibrary>

            <Section>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Tons of Books</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Hundreds of Authors</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Easily Bookmarked</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
            </Section>

            <Footer>
                <p>
                    An open source project by Anh Minh Tran{' '}
                    <a
                        href='https://github.com/anhminhtran235/Bookworm'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <i className='fab fa-github'></i>
                    </a>
                </p>
            </Footer>
        </>
    );
};

export default Home;
