import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const Page = ({ children }) => {
    return (
        <>
            <Header></Header>
            <BrowserRouter>{children}</BrowserRouter>
        </>
    );
};

export default Page;
