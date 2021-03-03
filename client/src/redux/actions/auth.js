import { AUTHENTICATE, DEAUTHENTICATE } from './types';

export const authenticate = (user) => {
    return { type: AUTHENTICATE, payload: user };
};

export const deauthenticate = () => {
    return { type: DEAUTHENTICATE };
};
