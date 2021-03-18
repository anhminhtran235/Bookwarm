import { withRouter } from 'react-router';
import { useLocation } from 'react-router';

import {
    PaginationArrow,
    PageNumber,
    PaginationStyle,
} from '../../styles/PaginationStyle';

const Pagination = ({ history, perPage, bookCount }) => {
    const location = useLocation();
    const currentPage = location.pathname.split('shopping/')[1];
    const goToPage = (page) => {
        history.push('/shopping/' + page);
    };

    console.log('currentPage: ' + currentPage + ', bookCount: ' + bookCount);

    return (
        <PaginationStyle>
            <PaginationArrow
                disabled={currentPage === '1'}
                onClick={() => goToPage(parseInt(currentPage) - 1)}
            >
                <i className='fas fa-chevron-left'></i>
            </PaginationArrow>
            <PageNumber active>{currentPage}</PageNumber>
            <PageNumber>...</PageNumber>
            <PaginationArrow
                disabled={
                    parseInt(bookCount) <=
                    parseInt(currentPage) * parseInt(perPage)
                }
                onClick={() => goToPage(parseInt(currentPage) + 1)}
            >
                <i className='fas fa-chevron-right'></i>
            </PaginationArrow>
        </PaginationStyle>
    );
};

export default withRouter(Pagination);
