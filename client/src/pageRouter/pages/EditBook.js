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
                    <h2>Edit product info</h2>
                    <Row>
                        <Column className='left'>
                            <input type='text' placeholder='Title' />
                            <input type='text' placeholder='Subtitle' />
                            <input type='text' placeholder='Author' />
                        </Column>
                        <Column className='right'>
                            <input type='text' placeholder='Category' />
                            <input type='text' placeholder='Price' />
                            <input type='text' placeholder='Promotion' />
                        </Column>
                    </Row>
                    <textarea placeholder='Short description' rows='1' />
                    <textarea placeholder='Description' rows='2' />
                    <label className='custom-file-upload'>
                        <input type='file' />
                        <i className='fa fa-cloud-upload'></i> Change image
                    </label>

                    <button>Edit product</button>
                </Form>
            </EditBookStyle>
            ;
        </>
    );
};

export default EditBook;
