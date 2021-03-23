import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { useState } from 'react';

import image from '../../assets/images/sell_image.jpg';
import { Column, Form, Row, SellStyle } from '../../styles/SellStyle';
import useForm from '../../lib/useForm';
import { toDataURL, isImageValid } from '../../lib/util';
import { cacheUpdateAddBook, ADD_BOOK_MUTATION } from '../../lib/graphql';

const Sell = () => {
    const { form, handleChange, clearForm } = useForm({
        title: '',
        subtitle: '',
        author: '',
        description: '',
        shortDescription: '',
        price: '',
        promotion: '',
        image: '',
    });

    const [state, setState] = useState({ imageName: '' });

    const [addBook, { loading }] = useMutation(ADD_BOOK_MUTATION, {
        update(cache, result) {
            clearForm();
            alertify.success('Book added successfully');
            cacheUpdateAddBook(cache, result);
        },
    });

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
                    addBook({ variables: formToSubmit });
                });
            } catch (error) {
                throw new Error(error);
            }
        } else {
            alertify.error('Please choose an image for this book');
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
            setState({ imageName: 'Upload Image *' });
        }
    };

    return (
        <>
            <SellStyle>
                <div className='side-img'>
                    <img src={image} alt='' />
                </div>
                <Form onSubmit={onSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Add new product</h2>
                        <Row>
                            <Column className='left'>
                                <input
                                    type='text'
                                    placeholder='Title *'
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
                                    placeholder='Author *'
                                    name='author'
                                    value={form.author}
                                    onChange={handleChange}
                                    required
                                />
                            </Column>
                            <Column className='right'>
                                <input
                                    type='number'
                                    step='0.01'
                                    min='0'
                                    max='100'
                                    placeholder='Price *'
                                    name='price'
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type='number'
                                    min='0'
                                    max='100'
                                    placeholder='Promotion (%) *'
                                    name='promotion'
                                    value={form.promotion}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    placeholder='Short description *'
                                    rows='1'
                                    name='shortDescription'
                                    value={form.shortDescription}
                                    onChange={handleChange}
                                    required
                                />
                            </Column>
                        </Row>

                        <textarea
                            placeholder='Description *'
                            rows='3'
                            name='description'
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                        <label className='custom-file-upload'>
                            <input
                                type='file'
                                name='image'
                                onChange={onPickImage}
                                required
                            />
                            <i className='fa fa-cloud-upload'></i>{' '}
                            {!state.imageName
                                ? 'Upload Image *'
                                : state.imageName}
                        </label>

                        <button type='submit'>+ Add product</button>
                    </fieldset>
                </Form>
            </SellStyle>
        </>
    );
};

export default Sell;
