import NProgress from 'nprogress';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import 'nprogress/nprogress.css';

const Page = ({ children }) => {
    return (
        <>
            <BrowserRouter>
                <Header></Header>
                {children}
            </BrowserRouter>
        </>
    );
};

export default Page;
