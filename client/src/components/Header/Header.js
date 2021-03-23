import { withRouter } from 'react-router';
import { HeaderStyle, Button, Content } from '../../styles/HeaderStyle';

const Header = ({ history }) => {
    const goToShopping = () => {
        history.push('/shopping');
    };
    return (
        <>
            <HeaderStyle>
                <Content>
                    <h1 className='special-text'>
                        Meet your next favourite book
                    </h1>
                    <p>
                        Discover millions of books from a vast number of
                        categories including novel, biography, finance and
                        education
                    </p>
                    <Button onClick={goToShopping}>Start Reading Now</Button>
                </Content>
            </HeaderStyle>
        </>
    );
};

export default withRouter(Header);
