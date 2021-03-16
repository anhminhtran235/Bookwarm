import { PageNumber, PaginationStyle } from '../../styles/PaginationStyle';

const Pagination = () => {
    return (
        <PaginationStyle>
            <PageNumber>
                <i className='fas fa-chevron-left'></i>
            </PageNumber>
            <PageNumber>1</PageNumber>
            <PageNumber active>2</PageNumber>
            <PageNumber>...</PageNumber>
            <PageNumber>
                <i className='fas fa-chevron-right'></i>
            </PageNumber>
        </PaginationStyle>
    );
};

export default Pagination;
