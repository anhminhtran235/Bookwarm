import { OPEN_CART, CLOSE_CART } from './types';

export const openCart = () => {
    return { type: OPEN_CART };
};
export const closeCart = () => {
    return { type: CLOSE_CART };
};
