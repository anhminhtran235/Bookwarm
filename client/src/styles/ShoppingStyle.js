import styled from 'styled-components';
import { FlexColumn, FlexRow } from './common/UtilStyle';

export const ShoppingStyle = styled.div`
    padding: 0px var(--container-padding);
    padding-top: 80px;
    background: var(--lighter-grey);
`;

export const MainArea = styled.div`
    padding: 30px 0px 100px 0px;
    display: flex;
    align-items: flex-start;
`;

export const SideBars = styled.div`
    width: 50%;
`;

export const BooksStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
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
