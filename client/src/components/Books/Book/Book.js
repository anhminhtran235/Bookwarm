import { Card, Button } from 'react-bootstrap';

const Book = ({ title, description, image }) => {
    return (
        <Card className='mr-4 mt-4' style={{ width: '18rem', height: '28rem' }}>
            <Card.Img
                style={{ height: '18rem', objectFit: 'contain' }}
                variant='top'
                src={image}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Button bg='dark' variant='dark'>
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
};
export default Book;
