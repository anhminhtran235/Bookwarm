import styled from 'styled-components';

export const BookStyle = styled.div`
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

export const BookInfo = styled.div`
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

export const ButtonGroup = styled.div`
    margin-top: 10px;
    button:first-child {
        margin-right: 10px;
    }
`;

export const BookButton = styled.button`
    background: white;
    color: var(--lighter-black);
    border-radius: 5px;
    font-size: 20px;
    :hover {
        background: var(--darker-grey);
    }
`;
