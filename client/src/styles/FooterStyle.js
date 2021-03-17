import styled from 'styled-components';

import { FlexRow } from './common/UtilStyle';

export const FooterStyle = styled(FlexRow)`
    background: var(--darker-black);
    font-size: 16px;
    color: white;
    padding: 20px;
    text-align: center;
    p {
        margin: 0px;
    }
`;
