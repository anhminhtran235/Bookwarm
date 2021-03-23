import styled from 'styled-components';

import { FlexColumn, FlexRow } from './common/UtilStyle';

export const PopularBooks = styled(FlexColumn)`
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
    @media (max-width: 1015px) {
        div {
            margin-right: 0px;
            margin-bottom: 10px;
        }
    }
`;

export const BooksContainer = styled(FlexRow)`
    @media (max-width: 1015px) {
        flex-direction: column;
    }
    align-items: stretch;
    > div {
        flex: 1;
    }
`;

export const OurLibrary = styled(FlexColumn)`
    background: var(--lighter-grey);
    color: var(--lighter-black);
    padding: 40px 0px;
    text-align: center;
    p:hover {
        cursor: pointer;
        color: var(--darker-black);
    }
`;

export const Section = styled(FlexRow)`
    padding: 40px var(--container-padding);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
    @media (max-width: 927px) {
        flex-direction: column;
        div {
            margin-right: 0px;
        }
    }
`;

export const InnerSection = styled(FlexColumn)`
    text-align: center;
    flex: 1;
    i {
        font-size: 45px;
        padding: 20px;
        border-radius: 50%;
        color: white;
        background: var(--lighter-orange);
        :nth-child(2) {
            background: var(--lighter-blue);
        }
        margin-bottom: 10px;
    }

    @media (max-width: 927px) {
        border-bottom: 1px solid var(--darker-grey);
        margin-bottom: 20px;

        :last-child {
            border-bottom: none;
            margin-bottom: 0px;
        }
    }
`;
