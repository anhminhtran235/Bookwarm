import { Form, Col } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import useForm from '../lib/useForm';
import { StyledForm, StyledButton } from '../lib/Form';
import { toDataURL, useUser } from '../lib/util';
import * as alertify from '../lib/alertify';
import {
    SINGLE_BOOK_QUERY,
    UPDATE_BOOK_MUTATION,
    cacheUpdateUpdateBook,
} from '../lib/graphql';

const Edit = () => {
    const me = useUser();

    const { id } = useParams();
    const { data, loading, error } = useQuery(SINGLE_BOOK_QUERY, {
        variables: { id },
    });
    const book = data?.findBookById ? { ...data.findBookById } : null;
    if (book && book.image) {
        delete book.image;
    }

    const { form, handleChange } = useForm(
        book || {
            title: '',
            author: '',
            description: '',
            price: '',
        }
    );

    const [updateBook] = useMutation(UPDATE_BOOK_MUTATION, {
        variables: { id, ...form },
        update(cache, result) {
            alertify.success('Book updated successfully');
            cacheUpdateUpdateBook(cache, result);
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        updateBook();
    };

    const hasEditPermission =
        me && me.books.findIndex((book) => book.id === id) !== -1;

    return hasEditPermission ? (
        <div className='my-4'>
            <StyledForm onSubmit={onSubmit}>
                <h2>Edit book info</h2>

                <Form.Group as={Col}>
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Title'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Author *</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Author'
                        name='author'
                        value={form.author}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Price *</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Price'
                        name='price'
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <StyledButton variant='primary' type='submit'>
                    Update book
                </StyledButton>
            </StyledForm>
        </div>
    ) : (
        <Redirect to='/shopping' />
    );
};

export default Edit;
