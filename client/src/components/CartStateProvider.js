import { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const StateProvider = StateContext.Provider;

const CartStateProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };
    const closeCart = () => {
        setCartOpen(false);
    };
    const openCart = () => {
        setCartOpen(true);
    };

    return (
        <StateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
            {children}
        </StateProvider>
    );
};

const useCart = () => {
    const all = useContext(StateContext);
    return all;
};

export { CartStateProvider, useCart };
