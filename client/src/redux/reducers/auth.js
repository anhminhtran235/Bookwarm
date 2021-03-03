import { AUTHENTICATE, DEAUTHENTICATE } from '../actions/types';

const initialState = {
    isLoggedIn: null,
    user: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case DEAUTHENTICATE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
