import { useState } from 'react';

import { Dropdown, DropdownItem, SearchBar } from '../../styles/SearchStyle';

const Search = ({ searchToggled }) => {
    const [navState, setNavState] = useState({
        showSearch: false,
    });

    const toggleSearch = () => {
        searchToggled(!navState.showSearch);
        setNavState({
            showSearch: !navState.showSearch,
        });
    };

    return (
        <SearchBar showSearch={navState.showSearch}>
            <div className='input-wrapper'>
                <input type='text' placeholder='Find book' />
                <i className='fas fa-times' onClick={toggleSearch}></i>
            </div>
            <i className='fas fa-search search-icon' onClick={toggleSearch}></i>
            <Dropdown className='dropdown'>
                <DropdownItem className='active'>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div className='book-info'>
                        <p className='book-title'>
                            Big magic: Creative living without fear
                        </p>
                        <p className='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div className='book-info'>
                        <p className='book-title'>Big magic</p>
                        <p className='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div className='book-info'>
                        <p className='book-title'>Big magic</p>
                        <p className='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
            </Dropdown>
        </SearchBar>
    );
};

export default Search;
