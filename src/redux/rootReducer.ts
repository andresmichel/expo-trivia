import { combineReducers } from 'redux';
import settings from './settings/reducers';
import trivia from './trivia/reducers';

export default combineReducers({
    settings,
    trivia,
});