import { LOGIN, LOGOUT } from './types';

const login = () => (dispatch) => {
    dispatch({
        type: LOGIN,
    });
};

const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};

module.exports = {
    login,
    logout,
};
