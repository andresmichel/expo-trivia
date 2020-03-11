import { SET_COLOR_SCHEME } from './types';

export interface SettingsState {
    colorScheme: string,
}

const INITIAL_STATE: SettingsState = {
    colorScheme: 'light',
};

export default (state: SettingsState = INITIAL_STATE, action): SettingsState => {
    switch (action.type) {
        case SET_COLOR_SCHEME:
            return { ...state, colorScheme: action.colorScheme };

        default:
            return state;
    }
}