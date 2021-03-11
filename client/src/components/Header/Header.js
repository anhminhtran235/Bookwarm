import styled from 'styled-components';

import Navbar from './Navbar/Navbar';
import Search from './Search/Search';

const SearchWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid black;
`;

const Header = ({ history }) => {
    return (
        <>
            <Navbar />
            <SearchWrapper>
                <Search />
            </SearchWrapper>
        </>
    );
};

export default Header;
