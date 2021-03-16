import { useState } from 'react';

import { Dropdown, DropdownItem, SearchBar } from '../../styles/SearchStyle';

const Search = () => {
    const [navState, setNavState] = useState({
        showSearch: false,
    });

    const toggleSearch = () => {
        setNavState({
            showSearch: !navState.showSearch,
        });
    };

    return (
        <SearchBar showSearch={navState.showSearch}>
            <div class='input-wrapper'>
                <input type='text' placeholder='Find book' />
                <i class='fas fa-times' onClick={toggleSearch}></i>
            </div>
            <i class='fas fa-search search-icon' onClick={toggleSearch}></i>
            <Dropdown className='dropdown'>
                <DropdownItem className='active'>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div class='book-info'>
                        <p class='book-title'>
                            Big magic: Creative living without fear
                        </p>
                        <p class='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div class='book-info'>
                        <p class='book-title'>Big magic</p>
                        <p class='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <img
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt=''
                    />
                    <div class='book-info'>
                        <p class='book-title'>Big magic</p>
                        <p class='book-author'>Elizabeth Gilbert</p>
                    </div>
                </DropdownItem>
            </Dropdown>
        </SearchBar>
    );
};

export default Search;
