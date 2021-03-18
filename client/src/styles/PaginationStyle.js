import styled from 'styled-components';

export const PaginationStyle = styled.div`
    margin-top: 30px;
    display: flex;
`;

export const PageNumber = styled.div`
    background: ${(props) => (props.active ? 'var(--lighter-blue)' : 'white')};
    color: ${(props) => (props.active ? 'white' : 'var(--lighter-blue)')};
    border: 2px solid var(--lighter-blue);
    margin-right: 10px;
    padding: 5px 15px;
    border-radius: 3px;
    :hover {
        cursor: pointer;
        background: ${(props) =>
            props.active ? 'var(--darker-blue)' : 'var(--lighter-grey)'};
    }
    @media (max-width: 720px) {
        padding: 2px 5px;
        margin-right: 5px;
    }
`;

export const PaginationArrow = styled(PageNumber)`
    background: ${(props) => (props.disabled ? 'var(--darker-grey)' : 'white')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
`;
