import { FooterStyle } from '../../styles/FooterStyle';

const Footer = () => {
    return (
        <FooterStyle>
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
        </FooterStyle>
    );
};

export default Footer;
