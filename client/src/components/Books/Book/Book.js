import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import AddToCartButton from './AddToCartButton/AddToCartButton';
import RemoveBookButton from './RemoveBookButton/RemoveBookButton';

const Book = ({ book: { id, title, subtitle, image }, isMine, history }) => {
    const goToBook = () => {
        history.push('/book/' + id);
    };

    const goToEdit = () => {
        history.push('/edit/book/' + id);
    };

    return (
        <Card className='mr-4 mt-4' style={{ width: '20rem', height: '28rem' }}>
            <Card.Img
                style={{ height: '18rem', objectFit: 'contain' }}
                variant='top'
                src={image}
                onClick={goToBook}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {subtitle && <Card.Text>{subtitle}</Card.Text>}
            </Card.Body>
            <Card.Body>
                {isMine && (
                    <Button
                        className='ml-2'
                        bg='dark'
                        variant='dark'
                        onClick={goToEdit}
                    >
                        Edit
                    </Button>
                )}
                <AddToCartButton bookId={id} />
                {isMine && <RemoveBookButton bookId={id} />}
            </Card.Body>
        </Card>
    );
};

export default withRouter(Book);
