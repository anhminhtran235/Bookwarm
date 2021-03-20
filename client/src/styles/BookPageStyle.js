import styled from 'styled-components';

import { FlexColumn, FlexRow } from './common/UtilStyle';

export const BookPageStyle = styled.div`
    padding-top: 80px;
`;

export const Container = styled.div`
    background: var(--lighter-grey);
    padding: 40px var(--container-padding);
`;

export const Showcase = styled.div`
    background: white;
    padding: 60px;
    border-radius: 8px;
`;

export const ShowcaseTop = styled(FlexRow)`
    img {
        flex: 1 1 0px;
    }
    @media (max-width: 1096px) {
        flex-direction: column-reverse;
    }
`;

export const ShowcaseInfo = styled(FlexColumn)`
    flex: 3 3 0px;
    padding: 10px 0px;
    align-self: stretch;
    margin-left: 40px;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
        margin: 0;
    }
    .book-author {
        font-style: italic;
    }
    @media (max-width: 1096px) {
        margin: 0;
    }
`;

export const ImageContainer = styled.div`
    width: 33.33%;
    position: relative;
    overflow: hidden;
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
    img {
        width: 100%;
    }
    @media (max-width: 1096px) {
        width: 80%;
        margin-top: 20px;
    }
    @media (max-width: 720px) {
        width: 100%;
    }
`;

export const PriceBox = styled(FlexColumn)`
    justify-content: flex-start;
    margin-top: 20px;
    border: 2px solid var(--darker-grey);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    .top {
        padding: 10px 80px;
        background: var(--lighter-grey);
        .promotion {
            margin-right: 5px;
            color: var(--darkest-grey);
            font-size: 18px;
        }
    }
    .bottom {
        padding: 10px 20px;
        display: flex;
        input {
            padding: 10px;
            width: 70px;
            margin-right: 10px;
            border-radius: 5px;
        }
        button {
            padding: 0px 20px;
            background: var(--darker-black);
            color: white;
            border-radius: 50px;
            :hover {
                background: var(--lighter-black);
            }
        }
    }
    @media (max-width: 572px) {
        .top {
            padding: 10px 80px;
        }
        .bottom {
            input {
                padding: 5px;
                width: 30px;
            }
        }
        button {
            content: 'Add';
        }
    }
`;

export const Description = styled.div`
    margin-top: 30px;
    h2::after {
        content: '';
        margin-top: 10px;
        display: block;
        border: dashed 1px var(--darker-grey);
    }
`;

export const RelatedBooks = styled(FlexColumn)`
    padding: 40px var(--container-padding);
    background: var(--lighter-grey);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
    h3 {
        margin-bottom: 15px;
    }
    @media (max-width: 927px) {
        margin-right: 0px;
        div {
            margin-right: 0px;
        }
    }
`;

export const BooksContainer = styled(FlexRow)`
    @media (max-width: 927px) {
        flex-direction: column;
        > div {
            margin-bottom: 10px;
        }
    }
`;
