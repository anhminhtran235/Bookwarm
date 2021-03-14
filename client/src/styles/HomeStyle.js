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
`;

export const OurLibrary = styled(FlexColumn)`
    background: var(--lighter-grey);
    color: var(--lighter-black);
    padding: 40px 0px;
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
`;

export const InnerSection = styled(FlexColumn)`
    p {
        text-align: center;
    }
    img {
        color: white;
        padding: 20px;
        border-radius: 50%;
    }
`;
