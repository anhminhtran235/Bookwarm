import { HeaderStyle, Button, Content } from '../../styles/HeaderStyle';

const Header = () => {
    return (
        <>
            <HeaderStyle>
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
            </HeaderStyle>
        </>
    );
};

export default Header;
