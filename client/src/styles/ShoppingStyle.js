import styled from 'styled-components';
import { FlexColumn, FlexRow } from './common/UtilStyle';

export const ShoppingStyle = styled.div`
    padding: 0px var(--container-padding);
    padding-top: 80px;
    background: var(--lighter-grey);
`;

export const MainArea = styled.div`
    padding: 30px 0px 40px 0px;
    display: flex;
    align-items: flex-start;

    @media (max-width: 1300px) {
        flex-direction: column;
    }
`;

export const SideBars = styled.div`
    flex: 1 1 0px;
    width: 50%;
    @media (max-width: 1300px) {
        width: 100%;
        display: flex;
        margin-top: 40px;
    }
    @media (max-width: 720px) {
        flex-direction: column;
    }
`;

export const BooksStyle = styled.div`
    flex: 2 2 0px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    @media (max-width: 720px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 500px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

export const Card = styled.div`
    padding: 30px;
    h4 {
        font-size: 16px;
        font-weight: bold;
    }
    background: white;
    border-radius: 8px;
    margin-left: 40px;
    margin-bottom: 40px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    @media (max-width: 1300px) {
        width: 50%;
        :first-child {
            margin-left: 0px;
        }
    }
    @media (max-width: 720px) {
        width: 100%;
        margin-left: 0px;
    }
`;

export const SmallBook = styled(FlexRow)`
    justify-content: flex-start;
    margin-top: 40px;
    p {
        margin: 0;
    }
    img {
        height: 100%;
    }
    height: 100px;
`;

export const BookDetails = styled(FlexColumn)`
    align-items: flex-start;
    padding-left: 30px;
    .book-title {
        font-size: 18px;
        color: var(--lighter-blue);
        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .book-author {
        font-size: 14px;
        font-style: italic;
    }
    .book-price {
        font-size: 18px;
        font-weight: bold;
        .cross-out {
            color: var(--darkest-grey);
        }
    }
`;
