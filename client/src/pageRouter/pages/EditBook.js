import image from '../../assets/images/sell_image.jpg';
import Navbar from '../../component/Navbar/Navbar';

import { Column, Form, Row, SellStyle } from '../../styles/SellStyle';

const EditBookStyle = SellStyle;

const EditBook = () => {
    return (
        <>
            <Navbar />
            <EditBookStyle>
                <div className='side-img'>
                    <img src={image} alt='' />
                </div>
                <Form>
                    <h2>Edit product</h2>
                    <Row>
                        <Column className='left'>
                            <input type='text' placeholder='Title' />
                            <input type='text' placeholder='Subtitle' />
                            <input type='text' placeholder='Author' />
                            <input type='text' placeholder='Category' />
                        </Column>
                        <Column className='right'>
                            <input
                                type='text'
                                placeholder='Short description'
                            />
                            <input type='text' placeholder='Description' />
                            <input type='text' placeholder='Price' />
                            <input type='text' placeholder='Promotion' />
                        </Column>
                    </Row>
                    <label className='custom-file-upload'>
                        <input type='file' />
                        <i className='fa fa-cloud-upload'></i> Change Image
                    </label>

                    <button>Edit product</button>
                </Form>
            </EditBookStyle>
            ;
        </>
    );
};

export default EditBook;
