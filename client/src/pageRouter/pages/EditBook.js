import styled from 'styled-components';

import image from '../../assets/images/sell_image.jpg';
import Navbar from '../../component/Navbar/Navbar';
import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';

const EditBookStyle = styled(FlexRow)`
    height: 100vh;
    margin-top: 80px;
    padding: 0px var(--container-padding);
    .side-img {
        width: 33.33%;
    }
    background: var(--lighter-grey);
`;

const Form = styled(FlexColumn)`
    width: 66.67%;
    background: white;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    margin-left: 50px;
    padding: 30px 40px;
    border-radius: 8px;

    h2 {
        font-weight: bold;
        margin-bottom: 20px;
    }

    input,
    .custom-file-upload {
        margin-top: 10px;
        font-size: 20px;
        min-width: 180px;
        border-radius: 5px;
        padding: 5px 15px;
        border: 1px solid var(--darker-grey);
        :focus {
            outline: none;
            border: 1px solid var(--lighter-blue);
        }
    }

    input[type='file'] {
        display: none;
    }
    .custom-file-upload {
        margin-bottom: 0px;
        i {
            color: var(--lighter-blue);
        }
        :hover {
            cursor: pointer;
            background: var(--lighter-grey);
        }
    }

    button {
        margin-top: 40px;
        background: var(--lighter-blue);
        color: white;
        padding: 5px 20px;
        width: 100%;
        border: 1px solid var(--lighter-blue);
        border-radius: 5px;
        :hover {
            background: var(--darker-blue);
        }
    }

    p {
        margin-top: 20px;
        font-size: 16px;
        a {
            color: var(--darker-blue);
        }
    }
`;

const Column = styled(FlexColumn)`
    width: 50%;
`;

const Row = styled(FlexRow)`
    width: 100%;
    .left {
        align-items: flex-start;
    }
    .right {
        align-items: flex-end;
    }
`;

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
