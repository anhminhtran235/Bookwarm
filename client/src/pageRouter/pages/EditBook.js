import { Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import alertify from 'alertifyjs';

import image from '../../assets/images/sell_image.jpg';
import Navbar from '../../component/Navbar/Navbar';

import { Column, Form, Row, SellStyle } from '../../styles/SellStyle';
import useForm from '../../lib/useForm';
import { useUser } from '../../lib/util';
import {
    SINGLE_BOOK_QUERY,
    UPDATE_BOOK_MUTATION,
    cacheUpdateUpdateBook,
} from '../../lib/graphql';
import { useState } from 'react';

const EditBookStyle = SellStyle;

const EditBook = () => {
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
            subtitle: '',
            author: '',
            description: '',
            price: '',
        }
    );

    const [state, setState] = useState({ imageName: '' });

    const [updateBook, { loading: updateBookLoading }] = useMutation(
        UPDATE_BOOK_MUTATION,
        {
            variables: { id, ...form },
            update(cache, result) {
                alertify.success('Book updated successfully');
                cacheUpdateUpdateBook(cache, result);
            },
        }
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        updateBook();
    };

    const onPickImage = (e) => {
        setState({ imageName: e?.target?.files[0]?.name });
        handleChange(e);
    };

    const hasEditPermission =
        me && me.books.findIndex((book) => book.id === id) !== -1;

    return !hasEditPermission ? (
        <Redirect to='/shopping' />
    ) : (
        <>
            <Navbar />
            <EditBookStyle>
                <div className='side-img'>
                    <img src={image} alt='' />
                </div>
                <Form onSubmit={onSubmit}>
                    <fieldset
                        disabled={updateBookLoading}
                        aria-busy={updateBookLoading}
                    >
                        <h2>Edit product info</h2>
                        <Row>
                            <Column className='left'>
                                <input
                                    type='text'
                                    placeholder='Title'
                                    name='title'
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Subtitle'
                                    name='subtitle'
                                    value={form.subtitle}
                                    onChange={handleChange}
                                />
                                <input
                                    type='text'
                                    placeholder='Author'
                                    name='author'
                                    value={form.author}
                                    onChange={handleChange}
                                    required
                                />
                            </Column>
                            <Column className='right'>
                                <input type='text' placeholder='Category' />
                                <input
                                    type='text'
                                    placeholder='Price'
                                    name='price'
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                                <input type='text' placeholder='Promotion' />
                            </Column>
                        </Row>
                        <textarea
                            placeholder='Short description'
                            rows='1'
                            name='description'
                            value={form.description}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder='Description'
                            rows='2'
                            name='description'
                            value={form.description}
                            onChange={handleChange}
                        />
                        <label className='custom-file-upload'>
                            <input
                                type='file'
                                name='image'
                                onChange={onPickImage}
                            />
                            <i className='fa fa-cloud-upload'></i>{' '}
                            {!state.imageName
                                ? 'Change Image'
                                : state.imageName}
                        </label>

                        <button onClick={onSubmit}>Edit product</button>
                    </fieldset>
                </Form>
            </EditBookStyle>
            ;
        </>
    );
};

export default EditBook;
