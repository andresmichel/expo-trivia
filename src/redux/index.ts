import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));