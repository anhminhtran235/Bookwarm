import { useState } from 'react';
import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import { Dropdown, DropdownItem, SearchBar } from '../../styles/SearchStyle';
import { FIND_BOOKS_QUERY } from '../../lib/graphql';
import { useDebouncedCallback } from '../../lib/util';

const Search = ({ searchToggled, history }) => {
    const [navState, setNavState] = useState({
        showSearch: false,
    });

    const toggleSearch = () => {
        searchToggled(!navState.showSearch);
        setNavState({
            showSearch: !navState.showSearch,
        });
    };

    const [input, setInput] = useState({ value: '' });

    const [findBooks, { loading, data, error }] = useLazyQuery(
        FIND_BOOKS_QUERY,
        {
            fetchPolicy: 'no-cache',
        }
    );

    const goToBook = (id) => {
        history.push('/book/' + id);
    };

    const books = data?.findBooks || [];
    const findItemsDebounced = useDebouncedCallback(findBooks, 350);
    resetIdCounter();

    const {
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
        highlightedIndex,
        isOpen,
    } = useCombobox({
        items: books,
        onInputValueChange({ inputValue }) {
            setInput({ value: inputValue });
            findItemsDebounced({
                variables: { titleContains: inputValue, limit: 10 },
            });
        },
        onSelectedItemChange({ selectedItem }) {
            goToBook(selectedItem.id);
        },
        itemToString: (book) => book?.title || '',
    });

    return (
        <SearchBar showSearch={navState.showSearch}>
            <div {...getComboboxProps()} className='input-wrapper'>
                <input
                    {...getInputProps({
                        placeholder: 'Search for an item',
                        id: 'search',
                    })}
                />
                <i className='fas fa-times' onClick={toggleSearch}></i>
            </div>
            <i className='fas fa-search search-icon' onClick={toggleSearch}></i>
            <Dropdown className='dropdown' {...getMenuProps()}>
                {isOpen &&
                    books.map((book, index) => (
                        <DropdownItem
                            key={book.id}
                            {...getItemProps({ item: book })}
                            active={index === highlightedIndex}
                            onClick={() => goToBook(book.id)}
                        >
                            <img src={book.image} alt='' width='50px' />
                            <div className='book-info'>
                                <p className='book-title'>{book.title}</p>
                                <p className='book-author'>{book.author}</p>
                            </div>
                        </DropdownItem>
                    ))}
                {isOpen && !books.length && !loading && (
                    <DropdownItem>No item found for {input.value}</DropdownItem>
                )}
            </Dropdown>
        </SearchBar>
    );
};

export default withRouter(Search);
