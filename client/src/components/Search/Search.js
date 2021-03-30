import React, { useState } from 'react';
import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import { Dropdown, DropdownItem, SearchBar } from '../../styles/SearchStyle';
import { FIND_BOOKS_QUERY } from '../../lib/graphql';
import { useDebouncedCallback } from '../../lib/util';
import OutsideClickDetector from '../../lib/OutsideClickDetector';

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

    const closeSearch = () => {
        if (navState.showSearch) {
            searchToggled(false);
            setNavState({
                showSearch: false,
            });
        }
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

    const boldIfMatch = (text, strToMatch) => {
        const startIndex = text.toLowerCase().indexOf(strToMatch.toLowerCase());
        const endIndex = startIndex + strToMatch.length;
        if (startIndex === -1) {
            return text;
        }
        const boldText = <b>{text.substring(startIndex, endIndex)}</b>;
        return (
            <>
                {text.substring(0, startIndex)}
                {boldText}
                {text.substring(endIndex)}
            </>
        );
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
                variables: { titleContains: inputValue, limit: 5 },
            });
        },
        onSelectedItemChange({ selectedItem }) {
            goToBook(selectedItem.id);
        },
        itemToString: (book) => book?.title || '',
    });

    return (
        <OutsideClickDetector onClickOutside={closeSearch}>
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
                <i
                    className='fas fa-search search-icon'
                    onClick={toggleSearch}
                ></i>
                <Dropdown className='dropdown' {...getMenuProps()}>
                    {isOpen &&
                        books.map((book, index) => (
                            <DropdownItem
                                key={book.id}
                                {...getItemProps({ item: book })}
                                active={index === highlightedIndex}
                                onClick={() => {
                                    goToBook(book.id);
                                    toggleSearch();
                                }}
                            >
                                <img src={book.image} alt='' width='50px' />
                                <div className='book-info'>
                                    <p className='book-title'>
                                        {boldIfMatch(book.title, input.value)}
                                    </p>
                                    <p className='book-author'>{book.author}</p>
                                </div>
                            </DropdownItem>
                        ))}
                    {isOpen && !books.length && !loading && (
                        <DropdownItem>
                            No item found for {input.value}
                        </DropdownItem>
                    )}
                </Dropdown>
            </SearchBar>
        </OutsideClickDetector>
    );
};

export default withRouter(Search);
