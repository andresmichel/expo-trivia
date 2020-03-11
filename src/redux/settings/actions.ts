import { AsyncStorage } from 'react-native';
import { SET_COLOR_SCHEME } from './types';

export const setColorScheme = (value) => {
    return async (dispatch) => dispatch({ type: SET_COLOR_SCHEME, colorScheme: value });
}

export const toggleColorScheme = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const colorScheme = state.settings.colorScheme === 'dark' ? 'light' : 'dark';
        try {
            await AsyncStorage.setItem('colorScheme', colorScheme);
        } catch (error) {
            // 
        }
        dispatch({ type: SET_COLOR_SCHEME, colorScheme });
    }
}