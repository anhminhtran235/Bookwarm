import Header from './Header';

const Page = ({ children }) => {
    return (
        <div>
            <Header></Header>
            {children}
        </div>
    );
};

export default Page;
