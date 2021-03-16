import styled from 'styled-components';
import { FlexColumn, FlexRow } from './common/UtilStyle';

export const Wrapper = styled.div`
    padding-top: 80px;
    min-height: 100vh;
    h1 {
        margin-bottom: 20px;
    }
`;

export const Container = styled.div`
    margin-top: 20px;
    padding: 0px var(--container-padding);
`;

export const OrderStyle = styled(FlexColumn)`
    align-items: flex-start;
    border: 1px solid var(--darker-grey);
    border-radius: 5px;
    width: 100%;
    margin-bottom: 20px;

    :last-child {
        margin-bottom: 60px;
    }

    .top {
        width: 100%;
        background: var(--lighter-grey);
        padding: 20px;
        .inner {
            display: flex;
        }
        p {
            margin: 0;
        }
        .info-group {
            margin-right: 20px;
        }
    }

    .bottom {
        padding: 20px;
    }
`;

export const OrderItemStyle = styled(FlexRow)`
    margin-top: 10px;
    img {
        width: 50px;
    }
    p {
        margin: 0;
    }
    .item-info {
        margin-left: 15px;
        .book-title {
            color: var(--lighter-blue);
            :hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
        .book-author {
            font-style: italic;
            font-size: 16px;
        }
    }
`;
