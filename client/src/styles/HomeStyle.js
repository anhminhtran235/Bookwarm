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

export const Footer = styled(FlexRow)`
    background: var(--darker-black);
    color: white;
    padding: 40px;
    p {
        margin: 0px;
    }
`;
