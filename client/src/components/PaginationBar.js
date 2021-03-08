import { Pagination } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router';

const PaginationBar = ({ history, perPage, bookCount }) => {
    const location = useLocation();
    const currentPage = location.pathname.split('shopping/')[1];
    const goToPage = (page) => {
        history.push('/shopping/' + page);
    };

    return (
        <Pagination className='mt-4'>
            <Pagination.Prev
                disabled={currentPage === '1'}
                onClick={() => goToPage(parseInt(currentPage) - 1)}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Next
                disabled={
                    parseInt(bookCount) <=
                    parseInt(currentPage) * parseInt(perPage)
                }
                onClick={() => goToPage(parseInt(currentPage) + 1)}
            />
        </Pagination>
    );
};

export default withRouter(PaginationBar);
