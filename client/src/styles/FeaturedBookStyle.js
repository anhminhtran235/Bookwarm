import styled from 'styled-components';

import { FlexRow } from './common/UtilStyle';

export const FeaturedBookStyle = styled(FlexRow)`
    justify-content: space-between;
    padding: 40px var(--container-padding);
    color: var(--darker-black);
    div {
        width: 33.33%;
        padding: 0px 20px;
    }
    img {
        width: 100%;
        display: block;
        margin: auto;
    }
    h4 {
        color: var(--lighter-black);
    }
    h3 {
        color: var(--darker-black);
        font-size: 30px;
        margin-top: 25px;
        margin-bottom: 0px;
    }
    .book-author {
        color: var(--lighter-black);
        font-style: italic;
        font-size: 16px;
    }
    .book-description {
        margin-top: 25px;
    }
`;

export const GetBookButton = styled.button`
    margin-top: 10px;
    background: var(--darker-black);
    color: white;
    padding: 5px 20px;
    border-radius: 20px;
    :hover {
        background-color: var(--lighter-black);
    }
`;
