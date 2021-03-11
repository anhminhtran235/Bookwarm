import { resetIdCounter, useCombobox } from 'downshift';
import styled, { keyframes } from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import { FIND_BOOKS_QUERY } from '../../../lib/graphql';
import { useDebouncedCallback } from '../../../lib/util';
import { useState } from 'react';

const DropDown = styled.div`
    position: absolute;
    width: 100%;
    z-index: 2;
    border: 1px solid grey;
`;

const DropDownItem = styled.div`
    border-bottom: 1px solid grey;
    background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
    padding: 1rem;
    transition: all 0.2s;
    ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
    display: flex;
    align-items: center;
    border-left: 10px solid ${(props) => (props.highlighted ? 'grey' : 'white')};
    img {
        margin-right: 10px;
    }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
    position: relative;
    input {
        width: 100%;
        padding: 10px;
        border: 0;
        font-size: 2rem;
        &.loading {
            animation: ${glow} 0.5s ease-in-out infinite alternate;
        }
    }
`;

const Search = ({ history }) => {
    const [input, setInput] = useState({ value: '' });

    const [findBooks, { loading, data, error }] = useLazyQuery(
        FIND_BOOKS_QUERY,
        {
            fetchPolicy: 'no-cache',
        }
    );

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
            history.push('/book/' + selectedItem.id);
        },
        itemToString: (book) => book?.title || '',
    });

    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input
                    {...getInputProps({
                        type: 'search',
                        placeholder: 'Search for an item',
                        id: 'search',
                        className: loading ? 'loading' : '',
                    })}
                />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen &&
                    books.map((book, index) => (
                        <DropDownItem
                            key={book.id}
                            {...getItemProps({ item: book })}
                            highlighted={index === highlightedIndex}
                        >
                            <img
                                src={book.image}
                                alt={book.name}
                                width='50px'
                            />
                            {book.title}
                        </DropDownItem>
                    ))}
                {isOpen && !books.length && !loading && (
                    <DropDownItem>No item found for {input.value}</DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    );
};

export default withRouter(Search);
