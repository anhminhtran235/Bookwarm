import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { useState } from 'react';

import image from '../../assets/images/sell_image.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { Column, Form, Row, SellStyle } from '../../styles/SellStyle';
import useForm from '../../lib/useForm';
import { toDataURL, isImageValid } from '../../lib/util';
import { ADD_BOOK_MUTATION, cacheUpdateAddBook } from '../../lib/graphql';

const Sell = () => {
    const { form, handleChange, clearForm } = useForm({
        title: 'A Book',
        subtitle: 'This is a book',
        author: 'Minh Tran',
        description: 'This is a nice book',
        price: 28,
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
            <Navbar />
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
            ;
        </>
    );
};

export default Sell;
