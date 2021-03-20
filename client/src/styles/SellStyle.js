import styled, { keyframes } from 'styled-components';
import { FlexRow, FlexColumn } from './common/UtilStyle';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const SellStyle = styled(FlexRow)`
    margin-top: 80px;
    padding: 40px var(--container-padding);
    .side-img {
        width: 33.33%;
    }
    background: var(--lighter-grey);
    @media (max-width: 1180px) {
        .side-img {
            display: none;
        }
    }
`;

export const Form = styled.form`
    width: 66.67%;

    fieldset {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: white;
        box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
        margin-left: 50px;
        padding: 30px 40px;
        border-radius: 8px;
        text-align: center;

        h2 {
            font-weight: bold;
            margin-bottom: 20px;
        }

        input,
        textarea,
        .custom-file-upload {
            margin-top: 10px;
            width: 100%;
            font-size: 20px;
            border-radius: 5px;
            padding: 5px 15px;
            border: 1px solid var(--darker-grey);
            :focus {
                outline: none;
                border: 1px solid var(--lighter-blue);
            }
        }

        input[type='file'] {
            display: none;
        }
        .custom-file-upload {
            text-align: center;
            margin-bottom: 0px;
            i {
                color: var(--lighter-blue);
            }
            :hover {
                cursor: pointer;
                background: var(--lighter-grey);
            }
        }

        button {
            margin-top: 40px;
            background: var(--lighter-blue);
            color: white;
            padding: 5px 20px;
            width: 100%;
            border: 1px solid var(--lighter-blue);
            border-radius: 5px;
            :hover {
                background: var(--darker-blue);
            }
        }

        p {
            margin-top: 20px;
            font-size: 16px;
            a {
                color: var(--darker-blue);
            }
        }

        &[disabled] {
            opacity: 0.5;
        }
        &::before {
            height: 10px;
            display: block;
            background-image: linear-gradient(
                to right,
                #24b6c8 0%,
                #ffffff 50%,
                #24b6c8 100%
            );
        }
        &[aria-busy='true']::before {
            transform: translateY(-10px);
            content: '';
            width: 100%;
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }

        @media (max-width: 1180px) {
            width: 100%;
            margin-left: 0px;
        }
    }
`;

export const Column = styled(FlexColumn)`
    width: 50%;
    @media (max-width: 720px) {
        width: 100%;
    }
`;

export const Row = styled(FlexRow)`
    width: 100%;
    .left {
        margin-right: 20px;
    }
    @media (max-width: 720px) {
        flex-direction: column;
        .left {
            margin-right: 0px;
        }
    }
`;
