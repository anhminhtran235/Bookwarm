import { OPEN_CART, CLOSE_CART } from '../actions/types';

const initialState = {
    show: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_CART:
            return {
                ...state,
                show: true,
            };
        case CLOSE_CART:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
}
