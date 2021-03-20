import styled from 'styled-components';

import { FlexColumn } from './common/UtilStyle';

export const BookStyle = styled(FlexColumn)`
    position: relative;
    background: white;
    padding: 10px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    text-align: center;
    width: 100%;
    word-wrap: break-word;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        padding: 5px;
        box-shadow: 2px 2px 7px rgb(0 0 0 / 30%);
        border-radius: 2px;
        object-fit: fill;
    }

    .promotion-tag {
        background: red;
        color: white;
        position: absolute;
        top: 0;
        right: 0;
        padding: 3px 70px;
        transform: rotate(36deg) translate(174px, -87px);
        text-align: center;
        width: 500px;
    }
`;

export const BookInfo = styled(FlexColumn)`
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
        .promotion {
            margin-right: 5px;
            color: var(--darkest-grey);
            font-size: 18px;
        }
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
