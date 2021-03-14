import styled from 'styled-components';

import featureImg from '../../assets/images/feature.jpg';
import bookIcon from '../../assets/icons/icons8-open-book.png';
import { useEffect, useState } from 'react';

const Header = styled.header`
    background: url(${featureImg}) no-repeat center center/cover;
    height: 700px;
    color: white;
    margin: 0;
`;

const Outer = styled.div`
    background: ${(props) =>
        props.showNavBackground ? 'var(--light-blue)' : 'none'};
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
        content: ${(props) => (props.showNavBackground ? 'none' : "''")};
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const Section = styled.div`
    display: flex;
    padding: 40px var(--container-padding);
    color: var(--darker-black);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        text-align: center;
    }
    img {
        color: white;
        padding: 20px;
        border-radius: 50%;
    }
`;

const PopularBooks = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px var(--container-padding);
    background: var(--lighter-grey);
    color: var(--darker-black);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
    h3 {
        margin-bottom: 15px;
    }
`;

const Books = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Book = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 10px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;

    img {
        width: 100%;
        padding: 5px;
        box-shadow: 2px 2px 7px rgb(0 0 0 / 30%);
        border-radius: 2px;
    }
`;

const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;

    p {
        margin: 0;
    }
    .book-title {
        font-size: 20px;
    }
    .book-author {
        color: var(--lighter-black);
        font-size: 16px;
        font-style: italic;
    }
    .book-price {
        font-size: 25px;
        margin-top: 0px;
    }
`;

const ButtonGroup = styled.div`
    margin-top: 10px;
    button:first-child {
        margin-right: 10px;
    }
`;

const BookButton = styled.button`
    background: white;
    color: var(--lighter-black);
    border-radius: 5px;
    font-size: 20px;
    :hover {
        background: var(--darker-grey);
    }
`;

const FeaturedBook = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px var(--container-padding);
    color: var(--darker-black);
    div {
        width: 33.33%;
        padding: 0px 20px;
    }
    img {
        width: 100%;
        display: block;
        margin: auto;
    }
    h4 {
        color: var(--lighter-black);
    }
    h3 {
        color: var(--darker-black);
        font-size: 30px;
        margin-top: 25px;
        margin-bottom: 0px;
    }
    .book-author {
        color: var(--lighter-black);
        font-style: italic;
        font-size: 16px;
    }
    .book-description {
        margin-top: 25px;
    }
`;

const GetBookButton = styled.button`
    margin-top: 10px;
    background: var(--darker-black);
    color: white;
    padding: 5px 20px;
    border-radius: 20px;
    :hover {
        background-color: var(--lighter-black);
    }
`;

const OurLibrary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--lighter-grey);
    color: var(--lighter-black);
    padding: 40px 0px;
    p:hover {
        cursor: pointer;
        color: var(--darker-black);
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--darker-black);
    color: white;
    padding: 40px;
    p {
        margin: 0px;
    }
`;

const Home = () => {
    const [navState, setNavState] = useState({
        showNavBackground: false,
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
                    showNavBackground: true,
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
                    showNavBackground: false,
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
                <Outer
                    showNavBackground={navState.showNavBackground}
                    style={navState.navStyle}
                >
                    <Container>
                        <Nav showNavBackground={navState.showNavBackground}>
                            <h1 className='special-text'>Bookworm</h1>
                            <ul>
                                <li>
                                    <NavLink>Shop</NavLink>
                                </li>
                                <li>
                                    <NavLink>Sell</NavLink>
                                </li>
                                <li>
                                    <NavLink>Order</NavLink>
                                </li>
                                <li>
                                    <NavLink>Account</NavLink>
                                </li>
                                <li>
                                    <NavLink>My Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink>Logout</NavLink>
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
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
            </Section>
            <PopularBooks>
                <h3>Popular Books</h3>
                <Books>
                    <Book>
                        <img
                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            alt=''
                        />
                        <BookInfo>
                            <p className='book-title'>Big Magic</p>
                            <p className='book-author'>Elizabeth Gilbert</p>
                            <p className='book-price'>$22.59</p>
                            <ButtonGroup>
                                <BookButton>Detail</BookButton>
                                <BookButton>Buy</BookButton>
                            </ButtonGroup>
                        </BookInfo>
                    </Book>
                    <Book>
                        <img
                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            alt=''
                        />
                        <BookInfo>
                            <p className='book-title'>Big Magic</p>
                            <p className='book-author'>Elizabeth Gilbert</p>
                            <p className='book-price'>$22.59</p>
                            <ButtonGroup>
                                <BookButton>Detail</BookButton>
                                <BookButton>Buy</BookButton>
                            </ButtonGroup>
                        </BookInfo>
                    </Book>
                    <Book>
                        <img
                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            alt=''
                        />
                        <BookInfo>
                            <p className='book-title'>Big Magic</p>
                            <p className='book-author'>Elizabeth Gilbert</p>
                            <p className='book-price'>$22.59</p>
                            <ButtonGroup>
                                <BookButton>Detail</BookButton>
                                <BookButton>Buy</BookButton>
                            </ButtonGroup>
                        </BookInfo>
                    </Book>
                    <Book>
                        <img
                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            alt=''
                        />
                        <BookInfo>
                            <p className='book-title'>Big Magic</p>
                            <p className='book-author'>Elizabeth Gilbert</p>
                            <p className='book-price'>$22.59</p>
                            <ButtonGroup>
                                <BookButton>Detail</BookButton>
                                <BookButton>Buy</BookButton>
                            </ButtonGroup>
                        </BookInfo>
                    </Book>
                </Books>
            </PopularBooks>
            <FeaturedBook>
                <div>
                    <h4>Featured Book</h4>
                    <h3>The Complete Idiots Guide to Graphic Design</h3>
                    <p className='book-author'>Anggi Krisna</p>
                    <p className='description'>
                        From advanced selectors to generated content to web
                        fonts, and from gradients, shadows, and rounded corners
                        to elegant animations, CSS3 hold a universe of creative
                        possibilities. No one can better guide you through these
                        galaxies than Dan Cederholm.
                    </p>
                    <GetBookButton>Get This Book</GetBookButton>
                </div>
                <div>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                </div>
                <div>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                </div>
            </FeaturedBook>
            <OurLibrary>
                <h1>Browse Through Our Complete Library</h1>
                <p>Browse Collection &rarr;</p>
            </OurLibrary>
            <Section>
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <h3>Tons of Books</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <h3>Hundreds of Authors</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
                <Inner>
                    <img src={bookIcon} alt='img' />
                    <h3>Easily Bookmarked</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </Inner>
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
