import { Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import alertify from 'alertifyjs';
import { useState } from 'react';

import image from '../../assets/images/sell_image.jpg';
import Navbar from '../../component/Navbar/Navbar';

import { Column, Form, Row, SellStyle } from '../../styles/SellStyle';
import useForm from '../../lib/useForm';
import { useUser, isImageValid, toDataURL } from '../../lib/util';
import {
    SINGLE_BOOK_QUERY,
    UPDATE_BOOK_MUTATION,
    cacheUpdateUpdateBook,
} from '../../lib/graphql';

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

    const { form, handleChange, clearForm } = useForm(
        book || {
            title: '',
            subtitle: '',
            author: '',
            description: '',
            shortDescription: '',
            price: '',
            promotion: '',
        }
    );

    const [state, setState] = useState({ imageName: '' });

    const [updateBook, { loading: updateBookLoading }] = useMutation(
        UPDATE_BOOK_MUTATION,
        {
            variables: { id, ...form },
            update(cache, result) {
                alertify.success('Book updated successfully');
                clearForm();
                cacheUpdateUpdateBook(cache, result);
            },
        }
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.price) {
            form.price = parseFloat(form.price);
        }
        if (form.promotion) {
            form.promotion = parseFloat(form.promotion);
        }
        const formToSubmit = { ...form };

        if (form.image && form.image !== '') {
            try {
                toDataURL(form.image).then((base64Image) => {
                    formToSubmit.image = base64Image;
                    updateBook({ variables: formToSubmit });
                });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            delete formToSubmit.image;
            updateBook({ variables: formToSubmit });
        }
    };

    const onPickImage = (e) => {
        if (isImageValid(e?.target?.files[0])) {
            setState({ imageName: e?.target?.files[0]?.name });
            handleChange(e);
        } else {
            alertify.error(
                'Please choose an image file. Accepted extensions are jpeg, jpg, png, bmp and gif'
            );
            setState({ imageName: 'Change Image' });
        }
    };

    const hasEditPermission =
        me && me.books.findIndex((book) => book.id === id) !== -1;

    return !hasEditPermission ? (
        <Redirect to='/shopping' />
    ) : (
        <>
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
                                <input
                                    type='text'
                                    placeholder='Price'
                                    name='price'
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Promotion (%)'
                                    name='promotion'
                                    value={form.promotion}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    placeholder='Short description'
                                    rows='1'
                                    name='shortDescription'
                                    value={form.shortDescription}
                                    onChange={handleChange}
                                />
                            </Column>
                        </Row>

                        <textarea
                            placeholder='Description'
                            rows='3'
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
