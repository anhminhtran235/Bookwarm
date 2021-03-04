import { combineReducers } from 'redux';
import authReducer from './auth';
import cartReducer from './cart';

export default combineReducers({ authReducer, cartReducer });
